// controllers/maincontroller.js

exports.gethome = (req, res) => {
  res.render('main/index', { title: 'euni messenger | home' });
};

exports.getabout = (req, res) => {
  res.render('main/about', { title: 'about euni messenger' });
};

exports.getchat = (req, res) => {
  res.render('main/chat', { title: 'chat room' });
};
