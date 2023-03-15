/** 放一些比较杂的中间件 */
import cross from './cross.js';
import setUser from './setUser.js';
import monitorRequest from './monitorRequest.js';
import graphqlUploadKoa from 'graphql-upload/graphqlUploadKoa.mjs';
import { koaBody } from 'koa-body';

export default (app) => {
  // graphql 中解析上传文件
  app.use(graphqlUploadKoa());


  // 跨域设置
  app.use(cross);

  // 设置用户信息(到 state)
  app.use(setUser);

  // 监听请求
  app.use(monitorRequest);

  // koa body 解析(不进行文件上传解析)
  app.use(koaBody());
};
