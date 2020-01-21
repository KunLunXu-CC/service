/**
 * 用户身份校验、api 校验
 */
const _ = require('lodash');
const { defaultUser } = require('../../config/system');
const { verifyJwt } = require('../../utils/encryption');

/**
 * 设置用户信息(到koa.state)
 * @param {Object} ctx        koa 上下文
 */
const setUserInfoToState = async ({ ctx }) => {
  const token = ctx.request.header.authorization;
  const roleServer = ctx.db.mongo.Role;
  const userServer = ctx.db.mongo.User;

  // 1. 验证 token: payload 为对象
  const payload = await verifyJwt(token);

  // 2. 获取用户: token 对应用户 || 默认用户
  let user = payload.id
    ? await userServer.findOne({ _id: payload.id })
    : null;

  // 2.1 如果 token 错误或者数据更新可能 id 错误找不到用户时则使用默认用户
  user = user
    ? user
    : await userServer.findOne({ account: defaultUser });

  // 3. 设置 koa 状态: ctx.state.user ctx.state.role
  if (user && user.role){
    ctx.state.role = await roleServer.findOne({ _id: user.role });
    ctx.state.user = user;
  }

  // 4. 打印输出用户信息
  console.group('\n\n\n\n\n中间件(jurisdiction)内获取的用户信息:');
  console.log('ctx.state: ', ctx.state);
  console.groupEnd();
};

// 用户身份校验、api 校验
module.exports = async (ctx, next) => {
  await setUserInfoToState({ ctx });
  await next();
}
