const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();

// 路由配置
router.get('/', async (ctx, next) => { ctx.body = '这是一首页'; });

// 微信开发
router.get('/wechat', require('./wechat'));

// github webhooks
router.post('/web-hooks', require('./service/webHooks'));

// 图片上传
router.post('/photo/upload', require('./service/photo/upload'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
