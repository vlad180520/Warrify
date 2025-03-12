# Warrify - Warranty Management System

## Description

Warrify is an innovative application that helps users efficiently and automatically organize and manage their warranties. Using an intelligent crawler, Warrify automatically extracts warranties from emails using OCR and the DeepSeek API, providing a complete storage and notification solution.

## Technologies Used

- **Frontend:** Vite + React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **OCR & AI:** DeepSeek API for extracting information from documents

## Main Features

- **Automatically extracts warranties from emails** using an AI-powered crawler.
- **Advanced OCR** for recognizing and organizing information from documents.
- **Intuitive dashboard** for viewing warranties and analytics.
- **Smart notifications** for warranty expiration and renewal.
- **Loss protection** through automatic document backup.

## Installation and Usage

### 1. Clone Repository

```bash
git clone https://github.com/username/warrify.git
cd warrify
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run start  # Start server (using nodemon)
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev  # Start frontend server
```

### 4. Database Configuration

Make sure you have MongoDB installed and running either locally or on a cloud server.

### 5. Environment Variables Configuration

To properly run the application, create a `.env` file in the `backend` directory with the following variables:

```ini
MONGO_URI= # MongoDB cluster URI (does not work locally)
GOOGLE_CLIENT_ID= # OAuth client ID
GOOGLE_CLIENT_SECRET= # OAuth client secret
DEEPSEEK_API_URL= # DeepSeek API URL
DEEPSEEK_API_KEY= # DeepSeek API key
```

### 6. Usage

- Log in with your Gmail account to allow the crawler to extract warranties.
- Access the dashboard to view and organize your warranties.
- Receive automatic notifications about their expiration.

## License

The project is open-source and distributed under the MIT license.

---

**Warrify - Simplified warranty organization!**
