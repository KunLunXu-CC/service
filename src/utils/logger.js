const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const winston = require('winston');
// TODO: 循环引用无法, 报错, 无法拿到秘钥 -> 无法校验用户身份, ws 连接直接断开
const loggerWss = require('../app/ws/logger');
require('winston-daily-rotate-file');

// [transports] 文件传输: 以文件的形式存储日志
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.resolve(__dirname, '../../logs/%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',   // 日志文件划分, 按小时进行划分日志
  maxFiles: '7d',                 // 日志数量限制, 只保存 7 天内的日志(最多: 7 * 24)
  maxSize: '20m',                 // 文件大小限制
});

// [transports] WebSocket 输出: 通过 WebSocket 广播日志, 实现客户端日志实时查看
const wsTransport = new class extends winston.Transport {
  log (info, callback) {
    loggerWss.clients && loggerWss.clients.forEach(
      (client) => client.send(JSON.stringify(info, null, 4)),
    );
    callback();
  }
};

// [format] 格式化打印内容
const printf = ({ level, message }) => (`
  \n----- [start] -----\n
  级别: ${level},
  时间: ${moment().format('YYYY-MM-DD hh:mm:ss')},
  内容: \n${_.isString(message) ? message : JSON.stringify(message, null, 2)},
  \n----- [end] -----\n
`);

/**
 * TODO: 数据库存储, 自定义 transport 并对日志进行存储
 * 调用 winston 实例 logger 方法来输出日志
 * 不同方法对应不同日志级别, 所有方法有: emerg alert crit error warning notice info debug
 * 如: logger.info 输出信息
 * 如: logger.error 输出错误信息
 * 待输出日志可以是对象(对象中建议使用 label 进行日志标记) 当然也可以是一个字符串
 */
module.exports = winston.createLogger({
  // 格式化
  format: winston.format.combine(
    // winston.format.label({ label: 'right meow!' }),         // 往日志信息里添加 label 字段
    // winston.format.timestamp(),                             // 往日志信息里添加 timestamp(时间戳) 字段
    winston.format.prettyPrint(),                           // 日志打印(输出)前
    winston.format.printf(printf),
  ),
  // 输出, 可将日志输出到多个途径
  transports: [
    wsTransport,
    fileTransport,
    // new winston.transports.Console(),
  ],
});
