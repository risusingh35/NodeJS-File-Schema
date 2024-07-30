const jwt = require('jsonwebtoken');
const {auth} = require('../../config/index');

const verifyToken = (token) => {
  return jwt.verify(token, auth.jwtSecret);
};

module.exports = {
  verifyToken,
};
