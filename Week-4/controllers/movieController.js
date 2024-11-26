const Movie = require('../models/movie');



// Controller to fetch all movies
const getAllMovies = async (req, res) => {
  try {
    const { title, director, year } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    if (director) query.director = { $regex: director, $options: 'i' };
    if (year) query.year = parseInt(year, 10);

    const movies = await Movie.find(query); // Use Mongoose to fetch movies
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Controller to fetch a specific movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Use Mongoose to find movie by ID
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Invalid movie ID' });
  }
};

// Controller to add a new movie
const addMovie = async (req, res) => {
    try {
      // Save sanitized data (from middleware) to the database
      const movie = new Movie(req.body);
      const savedMovie = await movie.save();
      res.status(201).json(savedMovie); // 201 Created
    } catch (err) {
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };

// Controller to update a movie by ID
// Controller to update a movie by ID
const updateMovieById = async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body, // Sanitized data from middleware
        { new: true, runValidators: true } // Return updated document and validate with Mongoose
      );

      if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
      res.json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update movie' });
    }
  };


// Controller to delete a movie by ID
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(400).json({ error: 'Invalid movie ID' });
  }
};

// Export the controller functions
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
};
