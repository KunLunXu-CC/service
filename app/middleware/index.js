/** 放一些比较杂的中间件 */
const bodyParser = require('koa-bodyparser');
const staticServe = require('koa-static');
const logger = require('./logger');
const cross = require('./cross');
const path = require('path');
module.exports = (app) => {
  // 跨域设置
  app.use(cross);
  // 日志
  app.use(logger);
  // 解析 body
  app.use(bodyParser());
  // 静态服务（优先于 route 执行， 注意避免路由冲突）
  app.use(staticServe(path.resolve(__dirname, '../static')));
}
