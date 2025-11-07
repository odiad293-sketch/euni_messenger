const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('mongodb connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
