const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'moviesDB',
        });
        console.log('Database connected.');

        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists. Updating password...');
            existingAdmin.password = 'admin123'; // Set plain text password
            await existingAdmin.save();
            console.log('Admin password updated!');
            return;
        }

        // Create the admin user
        await User.create({
            username: 'admin',
            password: 'admin123', // Save plain text password
            role: 'admin',
        });
        console.log('Admin user created!');
    } catch (err) {
        console.error('Error creating admin user:', err.message);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

seedAdmin();
