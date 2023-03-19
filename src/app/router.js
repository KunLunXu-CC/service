import Router from '@koa/router';
import webHooks from '#service/webHooks/index';
import aiChat from '#service/aiChat/index';
const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

router.get('/ai-chat', aiChat);

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
