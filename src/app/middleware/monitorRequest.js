// 请求信息拦截
import _ from 'lodash';
import logger from '#logger';

// 请求拦截: 请求状态保证为: 200、响应体保证为: 对象
const intercept = (ctx) => {
  ctx.cookies.set('login_jwt', '11');

  // 不处理 302 重定向
  if (
    ctx.response.header['content-type'] === 'text/event-stream' ||
    [302].includes(ctx.status)
  ) {
    return;
  }

  try {
    const body = _.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body;
    ctx.body = {
      ...(_.isObject(body) && !_.isArray(body) ? body : { data: body }),
      resCode: ctx.status,
    };
  } catch (message) {
    logger({ ctx, level: 'error', label: '中间件/请求信息拦截', message });
  }

  ctx.status = 200;
};

// 打印请求信息: (请求接口、请求参数、响应状态、响应体)
const printRequestInfo = (ctx) => {
  const { body: response, request } = ctx;
  const { body: requestBody, url, method } = request;
  const { query, variables, operationName } = requestBody || {};

  if (operationName === 'IntrospectionQuery') {
    return false;
  }

  logger({
    ctx,
    label: '中间件/请求信息拦截',
    message: {
      response,
      url: `${method} ${url}`,
      gq: { query, variables },
    },
  });
};

export default async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  } finally {
    // 1. 请求拦截
    intercept(ctx);

    // 2. 打印请求信息
    printRequestInfo(ctx);
  }
};
