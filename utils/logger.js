const _ = require('lodash');
const path = require('path');
const { resume_up } = require('qiniu');
const winston = require('winston');
require('winston-daily-rotate-file');

// 文件
const fileTransports = new winston.transports.DailyRotateFile({
  // // level: 'info',
  format: winston.format.printf(info => {
    try {
      return JSON.stringify(info);
    } catch {
    }
  }),
  filename: path.resolve(__dirname, '../logs/%DATE%.log'),
    // datePattern: 'YYYY-MM-DD-HH',
    // // zippedArchive: true,
    // maxSize: '20m',
    // maxFiles: '14d'
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
});

// 控制台
const consoleTransports = new winston.transports.Console();

module.exports = winston.createLogger({
  transports: [
    consoleTransports,
    fileTransports,
    // new winston.transports.File({filename: 'combined.log'})
  ]
});
