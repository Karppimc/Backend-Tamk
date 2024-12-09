require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectToDatabase = require('./config/db');
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Database connection
connectToDatabase();

// Routes
app.use('/events', eventRoutes);
app.use('/auth', authRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
