// mainroutes.js
const express = require('express');
const router = express.Router();
const maincontroller = require('../controllers/maincontroller');

// main pages
router.get('/', maincontroller.gethome);
router.get('/about', maincontroller.getabout);
router.get('/chat', maincontroller.getchat);

module.exports = router;
