
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  refreshJwtSecret: process.env.JWT_REFRESH_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  refreshJwtExpiration: process.env.JWT_REFRESH_EXPIRATION,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
};
