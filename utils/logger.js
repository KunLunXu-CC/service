const _ = require('lodash');
const path = require('path');
// const WebSocket = require('ws');
const winston = require('winston');
// const { getWss } = require('../app/ws/copy');
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
    // const wss = getWss();

    // if (wss.clients){
    //   wss.clients.forEach(client => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(JSON.stringify(info, null, 4));
    //     }
    //   });
    // }
    callback();
  }
}

module.exports = winston.createLogger({
  format: winston.format.printf(info =>info.message),
  transports: [
    fileTransports,
    customTransport,
    consoleTransports,
  ]
});
