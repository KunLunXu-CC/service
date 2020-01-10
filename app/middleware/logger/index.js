/**
 * logger 日志截取、打印或者后期对日志进行监控
 */
const print = require('./print');
const response = require('./response');

module.exports = async (ctx, next) => {
  await next();
  response(ctx);   // 响应拦截
  print(ctx);      // 日志打印
}
