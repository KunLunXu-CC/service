import _ from 'lodash';
import logger from '../../../utils/logger.mjs';

export default (ctx) => {
  try {
    const rescode = ctx.status;
    const body = _.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body;

    if (!_.isObject(body)) {
      throw Error('返回响应不是一个对象!');
    }

    ctx.body = { ...body, rescode };
  } catch (e) {
    logger.error(`中间件/logger: ${JSON.stringify(e, null, 4)}`);
  }

  ctx.status = 200;
};
