/** 放一些比较杂的中间件 */
const staticServe = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');

const jurisdiction = require('./jurisdiction');
const logger = require('./logger');
const cross = require('./cross');
module.exports = (app) => {
  // 日志
  app.use(logger);

  // 跨域设置
  app.use(cross);

  // 身份校验(设置用户信息到 state)、api 校验
  app.use(jurisdiction);

  // koa body 解析, 支持文件上传解析
  app.use(koaBody({ multipart: true }));

  // 静态服务（优先于 route 执行， 注意避免路由冲突）
  app.use(staticServe(path.resolve(__dirname, '../static')));
}
