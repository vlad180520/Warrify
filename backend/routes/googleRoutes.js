import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { createHash } from 'crypto';
import pdfreader from 'pdfreader';
import session from 'express-session';

const { Parser } = pdfreader;
const router = express.Router();

// 1. Configurare middleware
router.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 oră
    }
}));

// 2. Configurare OAuth2 Google
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || "http://localhost:8080/auth/google/callback"
);

// 3. Cache și constante
const warrantyCache = new Map();
const CONCURRENT_REQUESTS = 3;
const REQUEST_TIMEOUT = 15000;

// 4. Funcție extragere text PDF cu gestionare erori
async function extractPDFText(buffer) {
    return new Promise((resolve, reject) => {
        let text = '';
        const parser = new Parser();
        
        parser.parseBuffer(buffer, (err, item) => {
            if (err) {
                console.error('Eroare parsare PDF:', err);
                return reject(err);
            }
            if (!item) {
                const cleanedText = text
                    .replace(/\s+/g, ' ')
                    .replace(/[^a-zA-Z0-9ăâîșțĂÂÎȘȚ ]/g, ' ')
                    .substring(0, 3000);
                return resolve(cleanedText);
            }
            if (item.text) text += item.text + ' ';
        });
    });
}

// 5. Sistem îmbunătățit de validare
async function isWarrantyDocument(pdfBuffer) {
    const contentHash = createHash('sha256').update(pdfBuffer).digest('hex');
    
    if (warrantyCache.has(contentHash)) {
        return warrantyCache.get(contentHash);
    }

    try {
        const pdfText = await extractPDFText(pdfBuffer);
        
        // Verificare în trei etape
        const hasKeywords = /garan[țt]ie|valabilitate|service|repara[țt]ie/i.test(pdfText);
        const hasStructure = /(model|serie).*[\dA-Z]{4,}/i.test(pdfText) 
                          && /(perioadă|valabil).*(\d{1,2}\s(luni|ani))/i.test(pdfText);
        
        if (!hasKeywords || !hasStructure) return false;

        // Verificare finală cu AI
        const prompt = `Este acesta un document de garanție valid? Răspunde doar cu DA sau NU.\n${pdfText.substring(0, 2000)}`;
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.1,
                max_tokens: 2
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: REQUEST_TIMEOUT
            }
        );

        const result = response.data.choices[0].message.content.trim().toUpperCase() === "DA";
        warrantyCache.set(contentHash, result);
        return result;

    } catch (error) {
        console.error('Eroare validare:', error.message);
        return false;
    }
}

// 6. Rute principale
router.get("/auth/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/gmail.readonly"],
        prompt: "consent"
    });
    res.redirect(authUrl);
});

router.get("/auth/google/callback", async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        req.session.accessToken = tokens.access_token;
        res.redirect('/api/emails');
    } catch (error) {
        console.error('Eroare autentificare:', error);
        res.redirect(`${process.env.FRONTEND_URL}/error?code=auth_failed`);
    }
});

router.get("/api/emails", async (req, res) => {
    try {
        const accessToken = req.session.accessToken;
        if (!accessToken) {
            return res.status(401).json({ error: "Necesită autentificare" });
        }

        const messages = await fetchAllMessages(accessToken);
        const warranties = [];
        
        // Procesare serială pentru fiabilitate
        for (const [index, message] of messages.entries()) {
            if (index % CONCURRENT_REQUESTS === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            try {
                const result = await processSingleEmail(message.id, accessToken);
                if (result) warranties.push(result);
            } catch (error) {
                console.error(`Eroare procesare ${message.id}:`, error.message);
            }
        }

        res.json({
            total: warranties.length,
            documents: warranties
        });
    } catch (error) {
        console.error('Eroare procesare:', error);
        res.status(500).json({ error: error.message });
    }
});

// 7. Funcții helper
async function fetchAllMessages(token) {
    let messages = [];
    let pageToken = null;
    
    do {
        try {
            const response = await axios.get(
                "https://gmail.googleapis.com/gmail/v1/users/me/messages", 
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        maxResults: 50,
                        pageToken,
                        q: "has:attachment (mimeType:application/pdf) newer_than:1y"
                    },
                    timeout: REQUEST_TIMEOUT
                }
            );

            const validMessages = response.data.messages
                ?.filter(msg => msg?.id)
                ?.map(msg => ({ id: msg.id })) || [];

            messages = messages.concat(validMessages);
            pageToken = response.data.nextPageToken;

        } catch (error) {
            console.error('Eroare preluare mesaje:', error.message);
            break;
        }
    } while (pageToken);

    return messages;
}

async function processSingleEmail(id, token) {
    try {
        const msgRes = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                params: { format: 'full' },
                timeout: REQUEST_TIMEOUT
            }
        );

        const attachments = extractPDFAttachments(msgRes.data.payload?.parts || []);
        for (const attachment of attachments) {
            try {
                const attachmentRes = await axios.get(
                    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/attachments/${attachment.attachmentId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: REQUEST_TIMEOUT
                    }
                );

                const pdfBuffer = Buffer.from(attachmentRes.data.data, 'base64');
                if (await isWarrantyDocument(pdfBuffer)) {
                    return formatEmailData(msgRes.data, attachment.filename);
                }
            } catch (error) {
                console.error(`Eroare atașament ${attachment.attachmentId}:`, error.message);
            }
        }
        return null;
    } catch (error) {
        console.error(`Eroare procesare ${id}:`, error.message);
        return null;
    }
}

function extractPDFAttachments(parts, attachments = []) {
    parts.forEach(part => {
        try {
            if (part.mimeType === 'application/pdf' && part.body?.attachmentId) {
                attachments.push({
                    filename: part.filename || `document-${Date.now()}.pdf`,
                    attachmentId: part.body.attachmentId
                });
            }
            if (part.parts) extractPDFAttachments(part.parts, attachments);
        } catch (error) {
            console.error('Eroare procesare parte:', error);
        }
    });
    return attachments;
}

function formatEmailData(emailData, filename) {
    try {
        const headers = emailData.payload.headers.reduce((acc, header) => {
            acc[header.name.toLowerCase()] = header.value;
            return acc;
        }, {});

        return {
            id: emailData.id,
            subject: headers.subject || "Fără subiect",
            from: headers.from,
            date: headers.date || new Date().toISOString(),
            filename,
            snippet: emailData.snippet?.substring(0, 100) + '...'
        };
    } catch (error) {
        console.error('Eroare formatare email:', error);
        return null;
    }
}

export default router;