const mongoose = require('mongoose');
require('dotenv').config(); // make sure this is at the top

const connectdb = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
