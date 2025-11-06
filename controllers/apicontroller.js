// controllers/apicontroller.js
const messagemodel = require('../models/messagemodel');

exports.getmessages = async (req, res) => {
  const messages = await messagemodel.find().sort({ createdAt: -1 });
  res.json(messages);
};

exports.createmessage = async (req, res) => {
  const newMessage = new messagemodel({
    username: req.body.username,
    content: req.body.content
  });
  await newMessage.save();
  res.status(201).json({ message: 'Message created successfully!' });
};

exports.deletemessage = async (req, res) => {
  await messagemodel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Message deleted successfully!' });
};
