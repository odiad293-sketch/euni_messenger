const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinedat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userschema);
