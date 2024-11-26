const Joi = require('joi');

// Define Joi validation schema
const movieValidationSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
  }),
  director: Joi.string().min(1).required().messages({
    'string.empty': 'Director cannot be empty',
    'any.required': 'Director is required',
  }),
  year: Joi.number().integer().min(1900).max(2100).required().messages({
    'number.base': 'Year must be a number',
    'number.min': 'Year must be 1900 or later',
    'number.max': 'Year must be 2100 or earlier',
    'any.required': 'Year is required',
  }),
});

// Middleware to validate movie data
const validateMovie = (req, res, next) => {
  const { error, value } = movieValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  req.body = value; // Sanitize input with validated data
  next();
};

module.exports = validateMovie;
