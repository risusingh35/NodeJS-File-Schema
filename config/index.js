const authConfig = require('./authConfig');
const loggerConfig = require('./loggerConfig');
const database = require('./database');
const serverConfig = require('./serverConfig');
module.exports = {
  server: serverConfig,
  database:database,
  logger:loggerConfig,
  auth: authConfig,
};