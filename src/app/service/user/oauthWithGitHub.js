// import axios from 'axios';

export default async (ctx) => {
  const { code } = ctx.request.query;
  console.log('%c [ code ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', code);

  // 1. 授权
  // await axios({
  //   method: 'post',
  //   url: 'https://github.com/login/oauth/access_token?' +
  //     `client_id=${clientID}&` +
  //     `client_secret=${clientSecret}&` +
  //     `code=${requestToken}`,
  //   headers: {
  //     accept: 'application/json',
  //   },
  // });


  // 2. 获取用户信息
  // await axios({
  //   method: 'get',
  //   url: 'https://api.github.com/user',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `token ${accessToken}`,
  //   },
  // });

  // 3. 判断用户
  // 获取樱花信息 || 创建用户

  // 4. 设置 cookie


  ctx.status = 302;
  ctx.set('Authorization', 'token');
  ctx.redirect('http://localhost:8080');
};
