// 跨域设置
module.exports = async (ctx, next) => {
  const allowHeaders = [
    'Authorization',
    'Content-Type',
  ];
  // 允许响应返回的 header 字段
  ctx.set('Access-Control-Allow-Headers', allowHeaders.join(', '));
  // 响应头中，允许浏览器获取的字段
  ctx.set('Access-Control-Expose-Headers', allowHeaders.join(', '));
  await next();
}
