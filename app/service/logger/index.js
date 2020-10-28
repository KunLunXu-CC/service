const _ = require('lodash');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

// 文件
const fileTransports = new winston.transports.DailyRotateFile({
  filename: path.resolve(__dirname, '../logs/%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    maxFiles: '14d',
    maxSize: '20m',
});

// 控制台
const consoleTransports = new winston.transports.Console({
});

// 自定义
const customTransport = new class extends winston.Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    console.log('info\n\n\n\n\n',info);
    callback()
  }
}

// module.exports = winston.createLogger({
//   format: winston.format.printf(info =>info.message),
//   transports: [
//     fileTransports,
//     customTransport,
//     consoleTransports,
//   ]
// });

module.exports = (... args) => {
  console.log('------------\n\n\n\n', args);
  return { info: () => {} };
};
