const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const verifyToken = (token) => {
  return jwt.verify(token, config.auth.jwtSecret);
};

module.exports = {
  verifyToken,
};
