const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Correct path to the middleware
const {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

// Public Routes
router.get('/', authenticate(['admin', 'regular']), getAllEvents);
router.get('/:id', authenticate(['admin', 'regular']), getEventById);

// Admin-Only Routes
router.post('/', authenticate(['admin']), addEvent);
router.put('/:id', authenticate(['admin']), updateEvent);
router.delete('/:id', authenticate(['admin']), deleteEvent);

module.exports = router;
