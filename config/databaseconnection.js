const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://etiosaodia:destiny@cluster0.a1hcszb.mongodb.net/euni_messenger?retryWrites=true&w=majority&appName=Cluster0';

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
