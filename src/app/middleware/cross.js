// 跨域设置
import cors from '@koa/cors';

export default cors({
  origin: async (ctx) => {
    const requestOrigin = ctx.get('Origin');
    return /kunlunxu.cc$/.test(requestOrigin)
      ? requestOrigin
      : 'https://www.kunlunxu.cc';
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Type', 'Authorization'],
});
