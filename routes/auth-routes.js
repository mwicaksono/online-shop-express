const express = require('express');

const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/', AuthController.getLogin);

router.get('/signup', AuthController.getSignup);
router.get('/login', AuthController.getLogin);

router.post('/signup', AuthController.insertUser);

module.exports = router;