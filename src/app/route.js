const Router = require('@koa/router');
const router = new Router();

// github webhooks
router.post('/web-hooks', require('./service/webHooks'));

// 图片上传
router.post('/photo/upload', require('./service/photo/upload'));

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
