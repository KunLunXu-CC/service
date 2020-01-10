const _ = require('lodash');

module.exports = ctx => {
  try {
    const rescode = ctx.status;
    const body = _.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body;
    if (!_.isObject(body)) { throw Error('返回响应不是一个对象!') }
    ctx.body = { ... body, rescode };
  } catch(e){}
  ctx.status = 200;
}
