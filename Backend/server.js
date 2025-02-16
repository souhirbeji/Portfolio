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

// ✅ Initialisation d'Express
const app = express();

// ✅ Vercel Serverless - Set Trust Proxy
app.set('trust proxy', 1);

// ✅ Connexion à MongoDB
connectDB();

// ✅ Protection contre les attaques DoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limite chaque IP à 100 requêtes
});

// ✅ Configuration des origines CORS autorisées
const allowedOrigins = [
    'https://portfolio-uve2.vercel.app', // Frontend en production (🚀 sans / à la fin)
    'http://localhost:5173' // Développement local (🚀 sans / à la fin)
];

// ✅ Configuration avancée de CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS non autorisé pour cette origine"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ✅ Middleware de sécurité et performances
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(mongoSanitize());
app.use(hpp());

// ✅ Gestion des requêtes préflight pour CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// ✅ Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Portfolio API' });
});

// ✅ Déclaration des routes
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use('/skills', require('./routes/skills'));
app.use('/experiences', require('./routes/experiences'));
app.use('/messages', require('./routes/messages'));
app.use('/views', require('./routes/viewRoutes'));

// ✅ Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 🚀 **Correction Vercel Serverless : Transformer Express en une fonction Serverless**
module.exports = (req, res) => {
    app(req, res);
};