import Router from '@koa/router';
import webHooks from '#service/webHooks/index';
import demo from './demo.js';
const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

router.get('/demo', demo);

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
