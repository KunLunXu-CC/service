// 跨域设置
import cors from '@koa/cors';

export default cors({
  origin: async () => {
    // 开发环境
    if (process.env.NODE_ENV === 'development') {
      return '*';
    }

    return 'https://www.kunlunxu.cc';
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type'],
  exposeHeaders: ['Content-Type'],
});
