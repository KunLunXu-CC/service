const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = '首页';
  ctx.body = data;
});


router.post('/web-hooks', async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook-----\n\n\n\n\n\n', ctx);
  try {
    await fs.writeFile(
      path.resolve(__dirname, './webHookLogs.json'),
      JSON.stringify(ctx, null, 2),
      'utf8'
    );
  }catch (e){
    console.log('写入错误');
  }
  ctx.body = '成功';
});

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
