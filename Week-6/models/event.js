const mongoose = require('mongoose');

// Helper function to format date as DD-MM-YYYY
const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
});

// Exclude `__v` and format `date` as DD-MM-YYYY
eventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.date = formatDate(ret.date); // Format date as DD-MM-YYYY
    delete ret.__v; // Exclude `__v`
    return ret;
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
