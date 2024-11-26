const express = require('express');
const { login } = require('../controllers/authController'); // Destructure login from authController
const router = express.Router();

router.post('/login', login); // Use login directly

module.exports = router;


