/** 放一些比较杂的中间件 */
import setUser from './setUser.js';
import koaBody from 'koa-body';
import monitorRequest from './monitorRequest.js';
import cross from './cross.js';

export default (app) => {
  // 监听请求
  app.use(monitorRequest);

  // 跨域设置
  app.use(cross);

  // 设置用户信息(到 state)
  app.use(setUser);

  // koa body 解析, 支持文件上传解析
  app.use(koaBody({ multipart: true }));
};
