// databaseconnection.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const connectdatabase = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ mongodb connected successfully');
  } catch (error) {
    console.error('❌ mongodb connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectdatabase;
