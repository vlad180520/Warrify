import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { createHash } from 'crypto';
import session from 'express-session';
import pdf from 'pdf-parse';

const router = express.Router();

// 1. Configurare middleware
router.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// 2. Configurare OAuth2 Google
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || "http://localhost:8080/auth/google/callback"
);

// 3. Cache și constante
const warrantyCache = new Map();
const MAX_CONCURRENT_REQUESTS = 3;
const REQUEST_TIMEOUT = 30000;

// 4. Funcție extragere text PDF cu retry
// Corectare import

// Funcția corectă de extragere text
// 4. Funcție extragere text PDF îmbunătățită
async function extractPDFText(buffer) {
    try {
        // Verificare buffer valid
        if (!Buffer.isBuffer(buffer) || buffer.length < 4) {
            throw new Error('Buffer invalid pentru PDF');
        }

        // Verificare header PDF (primele 4 bytes trebuie să fie %PDF)
        const header = buffer.toString('hex', 0, 4);
        if (header !== '25504446') { // %PDF în hex
            throw new Error('Fișierul nu este un PDF valid');
        }

        const data = await pdf(buffer);
        let text = data.text;

        // Curățare text păstrând diacritice
        text = text
            .replace(/\s+/g, ' ')
            .replace(/[^\p{L}\p{N}\s]/gu, ' ') // Păstrează litere, numere și spații
            .replace(/\s{2,}/g, ' ')
            .substring(0, 3000)
            .trim();

        console.log('Text extras:', text.substring(0, 200) + '...'); // Debug logging
        return text;

    } catch (error) {
        console.error('Eroare extragere text:', error.message);
        // Returnează string gol pentru PDF-uri cu probleme
        return '';
    }
}

// 5. Sistem validare îmbunătățit
async function isWarrantyDocument(pdfBuffer) {
    const contentHash = createHash('sha256').update(pdfBuffer).digest('hex');
    
    if (warrantyCache.has(contentHash)) {
        return warrantyCache.get(contentHash);
    }

    try {
        const pdfText = await extractPDFText(pdfBuffer);
        
        // Verificare cu DeepSeek
        const prompt = `Acest text conține toate elementele unui certificat de garanție valid?RASPUNDE STRICT CU DA SAU NU
            Căutați:
            1. Denumire produs și model specific
            2. Termen clar de valabilitate
            3. Condiții de acoperire a defectelor
            4. Date de contact pentru service
            
            Text: ${pdfText.substring(0, 2500)}
            Răspundeți strict cu DA sau NU.`;

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

        const aiResponse = response.data.choices[0].message.content.trim().toUpperCase();
        const result = (aiResponse === "DA");
        console.log(result)
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
        res.redirect(`${process.env.FRONTEND_URL}/error?code=auth_failed`);
    }
});

router.get("/api/emails", async (req, res) => {
    try {
        const accessToken = req.session.accessToken;
        if (!accessToken) return res.redirect('/auth/google');

        const messages = await fetchAllMessages(accessToken);
        const results = [];
        
        // Procesare controlată
        for (let i = 0; i < messages.length; i++) {
            if (i > 0 && i % MAX_CONCURRENT_REQUESTS === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            try {
                const result = await processSingleEmail(messages[i].id, accessToken);
                if (result) results.push(result);
            } catch (error) {
                console.error(`Eroare mesaj ${i}:`, error.message);
            }
        }

        res.json({
            total: results.length,
            documents: results.filter(doc => doc.hasWarranty)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const MAX_EMAILS = 10
// 7. Funcții helper actualizate
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
                        maxResults: 10,
                        pageToken,
                        q: "has:attachment (mimeType:application/pdf OR filename:.pdf)"
                    },
                    timeout: REQUEST_TIMEOUT
                }
            );

            messages = messages.concat(response.data.messages || []);
            pageToken = response.data.nextPageToken;
        } catch (error) {
            console.error('Eroare preluare mesaje:', error.message);
            break;
        }
    } while (pageToken && messages.length < MAX_EMAILS);

    return messages.filter(msg => msg?.id);
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

        const parts = msgRes.data.payload?.parts || [];
        const attachments = extractPDFAttachments(parts);
        const warrantyAttachments = [];

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
                    warrantyAttachments.push({
                        filename: attachment.filename,
                        size: attachment.size
                    });
                }
            } catch (error) {
                console.error(`Eroare atașament ${attachment.attachmentId}:`, error.message);
            }
        }

        return warrantyAttachments.length > 0 ? {
            id,
            subject: getHeader(msgRes.data.payload.headers, 'Subject'),
            from: getHeader(msgRes.data.payload.headers, 'From'),
            date: getHeader(msgRes.data.payload.headers, 'Date'),
            attachments: warrantyAttachments
        } : null;

    } catch (error) {
        console.error(`Eroare procesare ${id}:`, error.message);
        return null;
    }
}

// Utilitare
function extractPDFAttachments(parts, attachments = []) {
    parts.forEach(part => {
        if (part.mimeType === 'application/pdf' || part.filename?.endsWith('.pdf')) {
            attachments.push({
                filename: part.filename || `document-${Date.now()}.pdf`,
                size: part.body?.size || 0,
                attachmentId: part.body?.attachmentId
            });
        }
        if (part.parts) extractPDFAttachments(part.parts, attachments);
    });
    return attachments;
}

function getHeader(headers, name) {
    return headers.find(h => h.name === name)?.value || 'Necunoscut';
}

export default router;