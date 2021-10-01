import Router from '@koa/router';
import webHooks from './service/webHooks/index.mjs';
import uploadPhoto from './service/photo/upload.mjs';

const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

// 图片上传
router.post('/photo/upload', uploadPhoto);

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
