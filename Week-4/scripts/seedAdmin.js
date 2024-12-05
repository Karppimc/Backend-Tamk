const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log the MONGODB_URI

const seedAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'moviesDB', // Explicitly specify the database name
        });
        console.log('Database connected.');

        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists. Updating password...');
            existingAdmin.password = await bcrypt.hash('admin1234', 10); // Hash the password
            await existingAdmin.save();
            console.log('Admin password updated!');
            return;
        }

        // Create the admin user
        const hashedPassword = await bcrypt.hash('admin1234', 10); // Hash the password
        await User.create({
            username: 'admin',
            password: hashedPassword, // Save hashed password
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