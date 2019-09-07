const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '首页';
  ctx.body = data;
});

router.post('/web-hooks', require('./service/webHooks'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
