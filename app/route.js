const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '首页';
  ctx.body = data;
});


router.post('/web-hooks', async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook ------\n\n\n\n\n\n', ctx.request.body, typeof ctx.request.body);
  fs.writeFileSync(
    path.resolve(__dirname, './webHookLogs.json'),
    JSON.stringify(ctx.req, null, 2),
    'utf-8'
  );
  console.log('---->>> ok \n\n\n\n\n\n\n');
  ctx.body = '成功';
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
