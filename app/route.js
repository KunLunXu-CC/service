const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '这是一首页';
  ctx.body = data;
});

router.post('/web-hooks', require('./service/webHooks'));
router.post('/photo/upload', require('./service/photo/upload'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
