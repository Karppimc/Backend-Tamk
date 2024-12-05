const express = require('express');
const router = express.Router();
const validateMovie = require('../middlewares/validateMovie');
const authenticate = require('../middlewares/authenticate'); // Correct path for authenticate middleware
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
} = require('../controllers/movieController');

// Define routes for movies
router.get('/', authenticate(['admin', 'regular']), getAllMovies); // Fetch all movies
router.get('/:id', authenticate(['admin', 'regular']), getMovieById); // Fetch a movie by ID
router.post('/', authenticate(['admin']), validateMovie, addMovie); // Add a new movie with validation
router.put('/:id', authenticate(['admin']), validateMovie, updateMovieById); // Update a movie by ID with validation
router.delete('/:id', authenticate(['admin']), deleteMovieById); // Delete a movie by ID

module.exports = router;
