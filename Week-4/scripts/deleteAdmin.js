const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const deleteAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'moviesDB',
        });
        console.log('Database connected.');

        const result = await User.deleteOne({ username: 'admin' });
        if (result.deletedCount > 0) {
            console.log('Admin user deleted.');
        } else {
            console.log('No admin user found.');
        }
    } catch (err) {
        console.error('Error deleting admin user:', err.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

deleteAdmin();
