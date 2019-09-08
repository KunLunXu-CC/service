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
  const result = verify(ctx.request);
  if (!result){
    ctx.body = '身份验证失败';
  } else {
    const { repository } = ctx.request.body;
    ctx.body = await script[repository.name](ctx.request);
  }
}
