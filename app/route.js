const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();

// 路由配置
router.get('/', async (ctx, next) => { ctx.body = '这是一首页'; });

router.post('/web-hooks', require('./service/webHooks'));
router.post('/photo/upload', require('./service/photo/upload'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
