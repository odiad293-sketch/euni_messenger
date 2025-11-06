// controllers/serverpanelcontroller.js
exports.getlogin = (req, res) => {
  res.render('serverpanel/loginserver', { title: 'Server Login' });
};

exports.loginserver = (req, res) => {
  const { username, password } = req.body;
  if (username === 'serveradmin' && password === '1234') {
    req.session.serverAuth = true;
    res.redirect('/server/dashboard');
  } else {
    res.status(401).render('serverpanel/loginserver', { error: 'Access Denied' });
  }
};

exports.dashboard = (req, res) => {
  res.render('serverpanel/dashboard', { title: 'Server Dashboard' });
};

exports.restartserver = (req, res) => {
  res.json({ message: 'Server restart command sent successfully.' });
};
