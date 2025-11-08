// models/adminmodel.js
const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('admin', adminschema);
