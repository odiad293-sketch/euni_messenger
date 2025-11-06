// middleware/adminauthmiddleware.js

module.exports = (req, res, next) => {
  try {
    if (!req.session || !req.session.adminid) {
      return res.status(401).redirect('/admin/login');
    }
    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    res.status(500).send('Internal server error');
  }
};
