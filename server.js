// server.js

const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const { connectdb } = require('./config/databaseconnection');

// load environment variables
dotenv.config();

// create express app
const app = express();

// connect to mongodb
connectdb();

// setup ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
  })
);

// import routes
const mainroutes = require('./routes/mainroutes');
const adminroutes = require('./routes/adminroutes');
const serverpanelroutes = require('./routes/serverpanelroutes');
const apiroutes = require('./routes/apiroutes');

// use routes
app.use('/', mainroutes);
app.use('/admin', adminroutes);
app.use('/server', serverpanelroutes);
app.use('/api', apiroutes);

// error handler
const errorhandler = require('./middleware/errorhandler');
app.use(errorhandler);

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
