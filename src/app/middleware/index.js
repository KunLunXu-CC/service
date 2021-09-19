/** 放一些比较杂的中间件 */
const setUser = require('./setUser');
const koaBody = require('koa-body');
const logger = require('./logger');
const cross = require('./cross');

module.exports = (app) => {
  // 日志
  app.use(logger);

  // 跨域设置
  app.use(cross);

  // 设置用户信息(到 state)
  app.use(setUser);

  // koa body 解析, 支持文件上传解析
  app.use(koaBody({ multipart: true }));
};
