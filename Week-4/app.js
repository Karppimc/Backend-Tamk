require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectToDatabase = require('./config/db');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const http = require('http');
const https = require('https');
const WebSocket = require('ws');
const selfsigned = require('selfsigned');
const { initializeWebsocket } = require('./wsConnection'); // Adjust based on your file name

const app = express();
const HTTP_PORT = 3000;
const HTTPS_PORT = 3443;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// API Routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
// Root Route (Optional)

app.use('/', (req, res) => {
  res.send('Welcome to the Movie API over HTTPS!');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Generate self-signed certificates
const attrs = [{ name: 'commonName', value: 'localhost' }];
const options = { days: 365 }; // Certificate validity
const { private: privateKey, cert: certificate } = selfsigned.generate(attrs, options);

// HTTPS server options
const sslOptions = {
    key: privateKey,
    cert: certificate,
};

// Create HTTP and HTTPS servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(sslOptions, app);

// Initialize WebSocket server for both protocols
initializeWebsocket(httpServer);
initializeWebsocket(httpsServer);

// Start HTTP server
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on http://localhost:${HTTP_PORT}`);
});

// Start HTTPS server
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${HTTPS_PORT}`);
});
