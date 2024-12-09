const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Register new users
router.post('/login', login);       // Login and get a JWT token

module.exports = router;
