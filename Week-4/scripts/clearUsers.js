const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const clearUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        
        await User.deleteMany({});
        console.log('All users deleted');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

clearUsers();
