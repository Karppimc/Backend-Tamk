const mongoose = require('mongoose');

// Define a Mongoose schema for Movie
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Movie title (required)
  director: { type: String, required: true }, // Director's name (required)
  year: {
    type: Number,
    required: true,
    min: 1888, // Movies were first created in 1888
  },
  genre: { type: String, default: 'Unknown' }, // Optional genre field
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 5, // Default movie rating
  },
});

// Transform the output to remove unwanted fields
movieSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v; // Remove the __v field
    delete ret.genre; // Remove the genre field
    delete ret.rating; // Remove the rating field
    return ret;
  },
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
