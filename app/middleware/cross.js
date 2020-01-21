/**
 * 跨域设置
 */
const _ = require('lodash');
const cors = require('koa2-cors');
const { corsOrigin } = require('../../config/system');

module.exports = cors({
  origin: ctx => {
    if (_.isRegExp(corsOrigin) && corsOrigin.test(ctx.origin)) {
      // 这里可以对请求 url 进行匹配, 进行更复杂的设置,
      // 比如允许多个域名、多个端口进行跨域请求、或者允许指定模式的 url 进行跨域请求
      return ctx.origin;
    }
    return corsOrigin;
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Type', 'Authorization'],
});
