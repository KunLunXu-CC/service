/**
 * 跨域设置
 */
import _ from 'lodash';
import cors from '@koa/cors';
import config from '#config/system';

export default cors({
  origin: async (ctx) => {
    if (
      _.isRegExp(config.corsOrigin) &&
      config.corsOrigin.test(ctx.header.referer)
    ) {
      // 这里可以对请求 url 进行匹配, 进行更复杂的设置,
      // 比如允许多个域名、多个端口进行跨域请求、或者允许指定模式的 url 进行跨域请求
      return '*';
    }

    return config.corsOrigin;
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Type', 'Authorization'],
});
