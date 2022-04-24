const jwt = require('jsonwebtoken');

const AUTH_HEADER = 'authorization';

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers[AUTH_HEADER];
    if (!token) {
      return res.status(401).send('Access denied');
    }
    next();
  }
}