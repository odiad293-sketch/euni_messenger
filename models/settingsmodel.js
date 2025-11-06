const mongoose = require('mongoose');

const settingsschema = new mongoose.Schema({
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: 'english' },
  createdat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('settings', settingsschema);
