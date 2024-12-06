const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

// Login Controller
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare plaintext passwords
        console.log('Password provided:', password);
        console.log('Password stored:', user.password);

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};





// Register Controller
const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!['admin', 'regular'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be "admin" or "regular".' });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        // Save the password as plaintext
        const user = new User({ username, password, role });
        await user.save();

        console.log('User stored in DB:', user);
        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};





module.exports = { login, register };
