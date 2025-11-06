// environmentsettings.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.port || 5000,
  mongodb_uri: process.env.mongodb_uri,
  session_secret: process.env.session_secret || 'defaultsecret',
  node_env: process.env.node_env || 'development'
};
