// adminroutes.js
const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admincontroller');
const adminauthmiddleware = require('../middleware/adminauthmiddleware');

// admin login
router.get('/loginadmin', admincontroller.getloginpage);
router.post('/login', admincontroller.loginadmin);

// admin dashboard (protected)
router.get('/dashboard', adminauthmiddleware, admincontroller.dashboard);

// manage users
router.get('/manageusers', adminauthmiddleware, admincontroller.manageusers);
router.get('/edit/:id', adminauthmiddleware, admincontroller.edituser);
router.get('/delete/:id', adminauthmiddleware, admincontroller.deleteuser);

module.exports = router;
