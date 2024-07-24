module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    refreshJwtSecret: 'your-refresh-secret-key',
    refreshJwtExpiration: '7d',
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
    
  };
  