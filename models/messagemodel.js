const mongoose = require('mongoose');

const messageschema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String },
  message: { type: String, required: true },
  sentat: { type: Date, default: Date.now }
});

module.exports = mongoose.model('message', messageschema);
