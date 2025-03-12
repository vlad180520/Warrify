# Warrify - Warranty Management System

## Descriere

Warrify este o aplicație inovatoare care ajută utilizatorii să îne organizeze și să îne gestioneze garanțiile într-un mod eficient și automatizat. Folosind un crawler inteligent, Warrify extrage automat garanțiile din e-mailuri utilizând OCR și API-ul DeepSeek, oferind o soluție completă de stocare și notificare.

## Tehnologii Utilizate

- **Frontend:** Vite + React
- **Backend:** Node.js + Express
- **Bază de date:** MongoDB
- **OCR & AI:** DeepSeek API pentru extragerea informațiilor din documente

## Funcționalități Principale

- **Extrage automat garanțiile din e-mailuri** utilizând un crawler AI.
- **OCR avansat** pentru recunoașterea și organizarea informațiilor din documente.
- **Dashboard intuitiv** pentru vizualizarea garanțiilor și analizelor.
- **Notificări inteligente** pentru expirarea și reînnoirea garanțiilor.
- **Protecție împotriva pierderii** prin backup automat al documentelor.

## Instalare și Utilizare

### 1. Clonare Repository

```bash
git clone https://github.com/username/warrify.git
cd warrify
```

### 2. Configurare Backend

```bash
cd backend
npm install
npm run start  # Start server (folosind nodemon)
```

### 3. Configurare Frontend

```bash
cd frontend
npm install
npm run dev  # Pornire server de frontend
```

### 4. Configurare Bază de Date

Asigură-te că ai instalat MongoDB și că rulează local sau pe un server cloud.

### 5. Configurare variabile de mediu

Pentru a rula corect aplicația, trebuie să creezi un fișier `.env` în directorul `backend` cu următoarele variabile:

```ini
FRONTEND_URL="http://localhost:5173"
PORT=8080
MONGO_URI= # URI-ul cluster-ului online MongoDB (nu funcționează local)
GOOGLE_CLIENT_ID= # ID-ul clientului pentru OAuth
GOOGLE_CLIENT_SECRET= # Secretul clientului pentru OAuth
DEEPSEEK_API_URL= # URL-ul API-ului DeepSeek
DEEPSEEK_API_KEY= # Cheia API-ului DeepSeek
```

### 6. Utilizare

- Autentifică-te cu contul de Gmail pentru a permite crawler-ului să extragă garanțiile.
- Accesează dashboard-ul pentru a vizualiza și organiza garanțiile tale.
- Primește notificări automate privind expirarea acestora.

## Licență

Proiectul este open-source și distribuit sub licența MIT.

---

**Warrify - Organizarea garanțiilor simplificată!**
