// serverpanelroutes.js
const express = require('express');
const router = express.Router();
const serverpanelcontroller = require('../controllers/serverpanelcontroller');
const serverauthmiddleware = require('../middleware/serverauthmiddleware');

// login
router.get('/loginserver', serverpanelcontroller.getlogin);
router.post('/login', serverpanelcontroller.loginserver);

// dashboard (protected)
router.get('/dashboard', serverauthmiddleware, serverpanelcontroller.dashboard);

// restart server action
router.post('/restart', serverauthmiddleware, serverpanelcontroller.restartserver);

module.exports = router;
