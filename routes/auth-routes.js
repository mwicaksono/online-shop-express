const express = require('express');

const AuthController = require('../controllers/auth-controller');

const router = express.Router();

// GET Routes
router.get('/', AuthController.getLogin);
router.get('/signup', AuthController.getSignup);
router.get('/login', AuthController.getLogin);

// POST Routes
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout)

module.exports = router;