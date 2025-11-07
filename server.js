const express = require('express');
const http = require('http');
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
const socketio = require('socket.io');
const dotenv = require('dotenv');
const connectdb = require('./config/databaseconnection');

dotenv.config();

// connect to mongodb
connectdb();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// middleware setup
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(methodoverride('_method'));
app.use(
  sessions({
    secret: process.env.session_secret || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);
app.use(flash());

// ejs template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// test route (homepage)
app.get('/', (req, res) => {
  res.render('index', { title: 'messenger live', message: 'your messenger server is working fine' });
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

// server port
const port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`server is live on port ${port}`);
});
