// utils/encryption.js

const bcrypt = require('bcryptjs');

exports.hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparepassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
