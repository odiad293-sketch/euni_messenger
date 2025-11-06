// controllers/admincontroller.js
const adminmodel = require('../models/adminmodel');
const usermodel = require('../models/usermodel');

exports.getloginpage = (req, res) => {
  res.render('admin/loginadmin', { title: 'Admin Login' });
};

exports.loginadmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await adminmodel.findOne({ username, password });

  if (!admin) {
    return res.status(401).render('admin/loginadmin', { error: 'Invalid credentials' });
  }

  req.session.adminId = admin._id;
  res.redirect('/admin/dashboard');
};

exports.dashboard = async (req, res) => {
  const users = await usermodel.find();
  res.render('admin/dashboard', { title: 'Admin Dashboard', users });
};

exports.manageusers = async (req, res) => {
  const users = await usermodel.find();
  res.render('admin/manageusers', { title: 'Manage Users', users });
};

exports.edituser = async (req, res) => {
  const user = await usermodel.findById(req.params.id);
  res.render('admin/edituser', { title: 'Edit User', user });
};

exports.deleteuser = async (req, res) => {
  await usermodel.findByIdAndDelete(req.params.id);
  res.redirect('/admin/manageusers');
};
