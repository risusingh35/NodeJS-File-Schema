const dotenv = require('dotenv');
const authConfig = require('./authConfig');
dotenv.config();
module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    url: process.env.MONGODB_URI,
  },
  logger: {
    level: 'info',
    file: 'logs/app.log',
  },
  auth: {...authConfig},
};
