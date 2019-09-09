const script = require('./script');
const { createHmac } = require('crypto');
const { webHookSecret } = require('../../../config/system');

// 身份验证
const verify = ({ header, body }) => {
  const sign = `sha1=${
    createHmac('sha1', webHookSecret)
    .update(JSON.stringify(body))
    .digest("hex")
  }`;
  return Buffer.from(header['x-hub-signature']).equals(Buffer.from(sign));
}

module.exports = async (ctx, next) => {
  const { repository } = ctx.request.body;
  const result = verify(ctx.request);
  if (!result){
    ctx.body = `身份验证失败!`;
  } else if(script[repository.name]){
    const { repository } = ctx.request.body;
    setTimeout(script[repository.name].bind(null, ctx.request), 0);
    ctx.body = '匹配成功, 将执行指定脚本';
  } else {
    ctx.body = '未定义该仓库的执行脚本!';
  }
}
