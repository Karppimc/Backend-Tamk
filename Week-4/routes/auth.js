const express = require('express');
const { login, register } = require('../controllers/authController'); // Correct import

const router = express.Router();

router.post('/register', register); // Use register for user registration
router.post('/login', login); // Use login for user authentication

module.exports = router; // Export the router
