const express = require('express');
const expressLayouts = require('express-ejs-layouts');
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
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/mainlayout'); // ✅ corrected: looks for views/layouts/mainlayout.ejs

// static files
app.use(express.static(path.join(__dirname, 'public')));

// homepage route
app.get('/', (req, res) => {
  res.render('main/index', {
    title: 'messenger live',
    message: 'your messenger server is working fine'
  });
});

// other routes
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/chat', (req, res) => {
  res.render('chat');
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
  console.log(`✅ server is live on port ${port}`);
});
