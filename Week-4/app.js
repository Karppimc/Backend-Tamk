require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectToDatabase = require('./config/db');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const http = require('http');

const app = express();
const PORT = 3000; // Use a single port for HTTP

app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Use the movies routes module
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server with HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
