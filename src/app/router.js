import Router from '@koa/router';
import webHooks from '#service/webHooks/index';

const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

// 测试
router.get('/test', async (ctx) => {
  // ctx.body = [];
  // ctx.body = '11111111';
  // ctx.body = 111;
  // ctx.body = true;
  ctx.body = {
    data: [],
    message: '上传成功 web hook',
  };
});

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
