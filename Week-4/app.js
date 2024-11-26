const express = require('express');
const morgan = require('morgan');
const connectToDatabase = require('./config/db');
const movieRoutes = require('./routes/movies'); // Import movies routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Use the movies routes module
app.use('/movies', movieRoutes); // All routes under '/movies'

app.use('/auth', authRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
