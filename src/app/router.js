import Router from '@koa/router';
import aiChat from '#service/aiChat/index';
import webHooks from '#service/webHooks/index';
import loginWithGitHub from '#src/app/service/user/loginWithGitHub';
const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

router.get('/api/ai-chat', aiChat);

// github oauth 授权
router.get('/api/oauth/github/callback', loginWithGitHub);

router.get('/api/test', (ctx) => {
  ctx.body = '11';
});

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
