const Event = require('../models/event');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Get an event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Invalid event ID' });
    }
};

// Create a new event
const addEvent = async (req, res) => {
    try {
      const { title, date, location, description } = req.body;

      if (!title || !date || !location) {
        return res.status(400).json({ error: 'Title, date, and location are required' });
      }

      const event = new Event({ title, date, location, description });
      const savedEvent = await event.save();

      res.status(201).json(savedEvent);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add event' });
    }
  };

// Update an event by ID
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update event' });
    }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete event' });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
};
