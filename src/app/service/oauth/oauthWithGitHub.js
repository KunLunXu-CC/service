export default (ctx) => {
  const { code } = ctx.request.query;
  console.log('%c [ code ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', code);

  // 1. 授权

  // 2. 获取用户信息

  // 3. 设置 cookie

  ctx.status = 302;
  ctx.redirect('http://localhost:9000');
};
