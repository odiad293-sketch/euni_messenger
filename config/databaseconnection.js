const mongoose = require('mongoose');

// Hardcoded MongoDB credentials
const username = 'etiosaodia';
const password = '<destiny>'; // <-- replace this with your real password
const cluster = 'cluster0.a1hcszb.mongodb.net';
const options = 'retryWrites=true&w=majority&appName=Cluster0';

// Build full connection string
const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/?${options}`;

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
