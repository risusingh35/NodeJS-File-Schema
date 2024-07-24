const logger = require('./logger');
const validator = require('./validator');
const responseFormatter = require('./responseFormatter');

module.exports = {
  logger,
  ...validator, // Spread the validator object to include all exported functions
  responseFormatter,
};
