// server.js
const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const sessions = require('express-session');
const flash = require('connect-flash');
const methodoverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection
const connectdb = require('./config/databaseconnection');
connectdb(); // your Mongo URI is in databaseconnection.js

// create express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(methodoverride('_method'));
app.use(
  sessions({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(flash());

// ejs template engine
app.use(expresslayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/mainlayout'); // default layout for all main views

// static files
app.use(express.static(path.join(__dirname, 'public')));

// import routes (all lowercase)
const mainroutes = require('./routes/mainroutes');
const adminroutes = require('./routes/adminroutes');
const serverpanelroutes = require('./routes/serverpanelroutes');
const apiroutes = require('./routes/apiroutes');

// use routes
app.use('/', mainroutes);
app.use('/admin', adminroutes);
app.use('/server', serverpanelroutes);
app.use('/api', apiroutes);

// catch-all 404 route
app.use((req, res) => {
  res.status(404).render('error/404', { title: 'page not found', layout: 'layout/mainlayout' });
});

// socket.io setup
io.on('connection', (socket) => {
  console.log('new user connected:', socket.id);

  socket.on('chatmessage', (data) => {
    io.emit('chatmessage', { id: uuidv4(), ...data });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`✅ server is live on port ${port}`);
});
