const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '这是一个很完美的首页';
  ctx.body = data;
});

router.post('/web-hooks', require('./service/webHooks'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
