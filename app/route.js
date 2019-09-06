const Router = require('koa-router');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '首页';
  ctx.body = data;
});


router.post('/web-hooks', async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook-----\n\n\n\n\n\n', ctx);
  ctx.body = '成功';
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
