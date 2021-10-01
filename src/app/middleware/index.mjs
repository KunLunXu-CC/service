/** 放一些比较杂的中间件 */
import setUser from './setUser.mjs';
import koaBody from 'koa-body';
import logger from './logger/index.mjs';
import cross from './cross.mjs';

export default (app) => {
  // 日志
  app.use(logger);

  // 跨域设置
  app.use(cross);

  // 设置用户信息(到 state)
  app.use(setUser);

  // koa body 解析, 支持文件上传解析
  app.use(koaBody({ multipart: true }));
};
