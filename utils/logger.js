const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDirectory = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Function to get the log file path for today
const getLogFilePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const datePath = path.join(logsDirectory, `${year}-${month}-${day}`);
  
  if (!fs.existsSync(datePath)) {
    fs.mkdirSync(datePath, { recursive: true });
  }

  return path.join(datePath, `${now.toISOString().slice(0, 10)}.log`);
};

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Change this to 'debug' to get more verbose logging
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: getLogFilePath() // Use the dynamic file path
    })
  ],
});

module.exports = logger;
