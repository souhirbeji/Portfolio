const express = require('express');
const router = express.Router();
const { register, login, checkAuth } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

// Validation middleware
const registerValidation = [
    body('username').not().isEmpty().trim().withMessage('Username is required'),
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email'),
    body('password').not().isEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/check', auth, checkAuth); // Nouvelle route protégée

module.exports = router;
