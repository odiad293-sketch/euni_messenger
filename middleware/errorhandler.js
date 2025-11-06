// middleware/errorhandler.js

module.exports = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).render('error/404', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.'
  });
};
