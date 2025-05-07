require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  await connectDB();

  const exists = await User.findOne({ email: 'chat@admin.com' });
  if (exists) return console.log('Admin already exists');

  const admin = new User({
    firstName: 'Admin',
    lastName: 'User',
    email: 'chat@admin.com',
    password: await bcrypt.hash('admin123##', 10),
    country: 'US',
    role: 'admin',
    verified: true
  });

  await admin.save();
  console.log('Admin user created');
  process.exit();
};

seedAdmin();
