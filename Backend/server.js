const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
require('dotenv').config();

// Initialize express app
const app = express();

// Set trust proxy for Vercel
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limite chaque IP à 100 requêtes par fenêtre
});

// CORS Configuration
const allowedOrigins = [
    'https://portfolio-uve2.vercel.app/', // Frontend en production
    'http://localhost:5173/' // Pour le développement local avec Vite
  ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(mongoSanitize());
app.use(hpp());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Portfolio API' });
});

// Define routes
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use('/skills', require('./routes/skills'));
app.use('/experiences', require('./routes/experiences'));
app.use('/messages', require('./routes/messages'));
app.use('/views', require('./routes/viewRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 🚀 **Correction pour Vercel : Exporter `app` au lieu de `app.listen()`**
module.exports = (req, res) => {
    app(req, res);
};