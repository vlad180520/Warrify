import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
// import warrantyRoutes from './routes/warrantyRoutes.js';
import warrantiesRoutes2 from './routes/warrantyRoutes2.js';
import dotenv from 'dotenv';
import googleRoutes from './routes/googleRoutes.js'
import session from "express-session";
dotenv.config();

const app = express();

// Middleware CORS (permite frontend-ului să comunice cu backend-ul)
app.use(cors({
  origin: process.env.FRONTEND_URL, // ex: "http://localhost:3000"
  credentials: true // permite transmiterea cookie-urilor
}));

// Middleware pentru sesiuni
app.use(session({
  secret: "your-secret-key", // Înlocuiește cu o cheie complexă
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Setează "true" DOAR în producție (HTTPS)
    httpOnly: true,
    sameSite: "lax" // Permite cookie-uri cross-site
  }
}));
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
// app.use('/api', warrantyRoutes);
app.use('/api', authRoutes);
app.use('/',googleRoutes);
app.use('/api', warrantiesRoutes2);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});