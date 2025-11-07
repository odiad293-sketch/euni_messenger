// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// load environment variables
dotenv.config();

// connect to database
require('./config/databaseConnection')();

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// import routes
app.use('/', require('./routes/mainRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/server', require('./routes/serverPanelRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// error handler
const { handleErrors } = require('./middleware/errorHandler');
app.use(handleErrors);

// 404 page
app.use((req, res) => {
  res.status(404).render('error/404', { title: 'Page Not Found' });
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌍 Server running on port ${port}`);
});
