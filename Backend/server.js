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

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

// Middleware
// Configuration de CORS
const allowedOrigins = [
    'https://zaanndou-frontend.vercel.app', // Frontend en production
    'http://localhost:5173' // Pour le développement local avec Vite
  ];
  
  app.use(cors({
    origin: allowedOrigins, 
    credentials: true, // Autorise l'envoi des cookies si nécessaire
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser certaines méthodes HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser certains headers
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(mongoSanitize()); // Prévention des injections NoSQL
app.use(hpp()); // Protection contre la pollution des paramètres HTTP

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
app.use('/views', require('./routes/viewRoutes')); // Nouvelle route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
