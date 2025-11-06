// controllers/maincontroller.js
exports.gethome = (req, res) => {
  res.render('index', { title: 'Euni Messenger | Home' });
};

exports.getabout = (req, res) => {
  res.render('about', { title: 'About Euni Messenger' });
};

exports.getchat = (req, res) => {
  res.render('chat', { title: 'Chat Room' });
};
