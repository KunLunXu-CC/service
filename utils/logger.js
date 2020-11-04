const _ = require('lodash');
const path = require('path');
const winston = require('winston');
const loggerWss = require('../app/ws/logger');
require('winston-daily-rotate-file');

// 文件传输: 以文件的形式存储日志
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.resolve(__dirname, '../logs/%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  maxFiles: '14d',
  maxSize: '20m',
});

// WebSocket 输出: 通过 WebSocket 广播日志, 实现客户端日志实时查看
const wsTransport = new class extends winston.Transport {
  log(info, callback) {
    loggerWss.clients && loggerWss.clients.forEach(
      client => client.send(JSON.stringify(info, null, 4))
    );
    callback();
  }
}

// TODO: 数据库存储, 自定义 transport 并对日志进行存储

module.exports = winston.createLogger({
  format: winston.format.printf(info =>info.message),
  transports: [
    wsTransport,
    fileTransport,
    new winston.transports.Console(),
  ],
});
