const WebSocket = require('ws');
const { ws: wsOptions } = require('../config/system');
const mongo = require('../utils/mongo');
const logger = require('./service/logger');

module.exports = (app) => {
  // 绑定 db: 数据库
  app.context.db = {
    mongo: mongo(),
  };
  // 绑定 ws: WebSocket
  app.context.ws = new WebSocket.Server(wsOptions);
  // 绑定 logger: 用于日志的输出
  app.context.logger = logger;
}
