const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Objet pour suivre les tentatives de connexion
const loginAttempts = new Map();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes en millisecondes

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation renforcée
        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
            });
        }

        // Vérification email et username
        const emailExists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username });

        if (emailExists || usernameExists) {
            return res.status(400).json({ 
                message: 'Nom d\'utilisateur ou email déjà utilisé',
                field: emailExists ? 'email' : 'username'
            });
        }

        const salt = await bcrypt.genSalt(12); // Augmentation à 12 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d', algorithm: 'HS256' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification des tentatives de connexion
        const userAttempts = loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
        
        if (userAttempts.count >= MAX_LOGIN_ATTEMPTS && 
            Date.now() - userAttempts.timestamp < LOCK_TIME) {
            return res.status(429).json({ 
                message: 'Compte temporairement bloqué. Veuillez réessayer plus tard.' 
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            loginAttempts.set(email, {
                count: userAttempts.count + 1,
                timestamp: Date.now()
            });
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            loginAttempts.set(email, {
                count: userAttempts.count + 1,
                timestamp: Date.now()
            });
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        // Réinitialisation des tentatives en cas de succès
        loginAttempts.delete(email);

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h', algorithm: 'HS256' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        // req.user est défini par le middleware auth
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
