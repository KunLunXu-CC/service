import Router from '@koa/router';
import aiChat from '#service/aiChat/index';
import webHooks from '#service/webHooks/index';
import oauthWithGitHub from '#src/app/service/user/oauthWithGitHub';
const router = new Router();

// github webhooks
router.post('/web-hooks', webHooks);

router.get('/ai-chat', aiChat);

// github oauth 授权
router.get('/oauth/github/callback', oauthWithGitHub);

router.get('/test', (ctx) => {
  // ctx.cookies.set('loginName', 'tobi', { domain: '.localhost' });

  ctx.set('Set-Cookie', 'loginName=tobi; path=/; SameSite=None; Secure; domain=localhost;');
  ctx.body = '11';
});

export default (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
