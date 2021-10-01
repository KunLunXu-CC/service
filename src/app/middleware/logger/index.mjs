/**
 * logger 日志截取、打印或者后期对日志进行监控
 */
import print from './print.mjs';
import response from './response.mjs';

// TODO: 层级太深
export default async (ctx, next) => {
  await next();
  response(ctx);   // 响应拦截
  print(ctx);      // 日志打印
};
