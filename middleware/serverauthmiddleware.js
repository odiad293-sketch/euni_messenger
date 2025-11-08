// middleware/serverauthmiddleware.js

module.exports = (req, res, next) => {
  const serverkey = req.headers['x-server-key'];
  const expectedkey = process.env.SERVER_AUTH_KEY;

  if (!serverkey || serverkey !== expectedkey) {
    return res.status(403).json({ error: 'Unauthorized server access' });
  }

  next();
};
