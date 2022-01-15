// 请求信息拦截
import _ from 'lodash';
import logger from '#logger';

// 请求拦截
// 1. 请求状态保证为: 200
// 2. 响应体保证为: 对象
const intercept = (ctx) => {
  try {
    const body = _.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body;
    ctx.body = {
      ...(_.isObject(body) && !_.isArray(body) ? body : { data: body }),
      resCode: ctx.status,
    };
  } catch (e) {
    logger.error(`中间件/请求信息拦截: ${JSON.stringify(e, null, 2)}`);
  }

  ctx.status = 200;
};

// 打印请求信息: (请求接口、请求参数、响应状态、响应体)
const printRequestInfo = ({ body: response, request }) => {
  const { body: requestBody, url, method } = request;
  const { query, variables, operationName } = requestBody || {};

  if (operationName === 'IntrospectionQuery') {
    return false;
  }

  const info = {
    response,
    url: `${method} ${url}`,
    gq: { query, variables },
  };

  logger.info(`中间件/请求信息拦截: ${JSON.stringify(info, null, 2)}`);
};

export default async (ctx, next) => {
  await next();
  // 1. 请求拦截
  intercept(ctx);

  // 2. 打印请求信息
  printRequestInfo(ctx);
};
