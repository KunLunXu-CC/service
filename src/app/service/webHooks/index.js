import config from '#config/system';
import blogClient from './blogClient.js';
import blogService from './blogService.js';
import { createHmac } from 'crypto';

// 脚本列表
const scripts = {
  'blog-client': blogClient,
  'blog-service': blogService,
};

// 身份验证
const verify = async ({ header, body }) => {
  const sign = `sha1=${
    createHmac('sha1', config.webHookSecret)
      .update(JSON.stringify(body))
      .digest('hex')
  }`;
  return Buffer.from(header['x-hub-signature']).equals(Buffer.from(sign));
};

export default async (ctx) => {
  const { repository } = ctx.request.body;
  const result = verify(ctx.request);

  if (!result) {
    ctx.body = '身份验证失败!';
  } else if (scripts[repository.name]) {
    const { repository } = ctx.request.body;
    setTimeout(scripts[repository.name].bind(null, ctx.request), 0);
    ctx.body = '匹配成功, 将执行指定脚本';
  } else {
    ctx.body = '未定义该仓库的执行脚本!';
  }
};
