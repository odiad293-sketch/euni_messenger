// utils/logger.js

const fs = require('fs');
const path = require('path');

const logfile = path.join(__dirname, '../logs/app.log');

exports.logmessage = (message) => {
  const time = new Date().toISOString();
  const fullmessage = `[${time}] ${message}\n`;
  console.log(fullmessage);
  fs.appendFile(logfile, fullmessage, (err) => {
    if (err) console.error('Log write error:', err);
  });
};
