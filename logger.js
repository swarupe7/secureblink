const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Define the log format
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(
    label({ label: 'secureblink' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logfile.log' })
  ]
});

module.exports = logger;
