require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'moviesDB', // Explicitly specify the database name
    });
    console.log('Connected to MongoDB using Mongoose');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
