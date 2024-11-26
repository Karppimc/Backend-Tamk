const express = require('express');
const router = express.Router();
const validateMovie = require('../middlewares/validateMovie');
const authenticate = require('./auth');
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
} = require('../controllers/movieController');

// Define routes for movies
router.get('/', getAllMovies); // Fetch all movies
router.get('/:id', getMovieById); // Fetch a movie by ID
router.post('/', authenticate, validateMovie, addMovie); // Add a new movie with validation
router.put('/:id', authenticate, validateMovie, updateMovieById); // Update a movie by ID with validation
router.delete('/:id', authenticate, deleteMovieById); // Delete a movie by ID

module.exports = router;
