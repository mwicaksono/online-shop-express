const express = require('express');

const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/', AuthController.index);
router.get('/login', AuthController.login);
router.get('/signup', AuthController.signup);

module.exports = router;