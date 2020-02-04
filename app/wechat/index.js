var sha1 = require("sha1");

var config = {
  "appID": "************",
  "appsecret": "*************************",
  "token": "*************************",
  "EncodingAESKey": "*************************",
}

module.exports = async (ctx, next) => {
  await next();

  // 获取微信服务器发送的数据
  const { signature, timestamp, nonce, echostr } = ctx.query;

  // token、timestamp、nonce三个参数进行字典序排序
  const arr = [config.token, timestamp, nonce].sort().join('');

  ctx.body = sha1(arr) === signature ? echostr : 'mismatch';
}
