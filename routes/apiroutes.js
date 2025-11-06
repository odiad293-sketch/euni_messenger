// apiroutes.js
const express = require('express');
const router = express.Router();
const apicontroller = require('../controllers/apicontroller');

// public api
router.get('/messages', apicontroller.getmessages);
router.post('/messages', apicontroller.createmessage);
router.delete('/messages/:id', apicontroller.deletemessage);

module.exports = router;
