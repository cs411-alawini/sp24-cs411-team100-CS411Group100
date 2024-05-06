const winston = require("winston");
var fs = require("fs");
var path = require("path");

var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var logDir = path.join(homeDir, "logs/cs411-webapp");

console.log("Log directory : " + logDir);

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir, { recursive: true });
}

var logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      json: true,
      timestamp: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: path.join(logDir, "/app.log"),
      json: true,
      colorize: false,
      timestamp: true,
      maxsize: 5242880,
      maxFiles: 10
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      json: true,
      timestamp: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: path.join(logDir, "/exceptions.log"),
      json: true,
      colorize: false,
      timestamp: true,
      maxsize: 5242880,
      maxFiles: 10
    })
  ],
  exitOnError: false
});

module.exports = logger;
