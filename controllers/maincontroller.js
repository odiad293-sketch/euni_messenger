// controllers/maincontroller.js
exports.gethome = (req, res) => {
  // temporary placeholders
  const user = null;          // will be replaced with real logged-in user later
  const contacts = [];        // list of contacts for the user
  const chats = [];           // recent chats for the user

  res.render('main/index', {
    title: 'Euni Messenger | Home',
    user,
    contacts,
    chats
  });
};

exports.getabout = (req, res) => {
  res.render('main/about', { title: 'About Euni Messenger' });
};

exports.getchat = (req, res) => {
  res.render('main/chat', { title: 'Chat Room' });
};
