/**
 * 用户身份校验、api 校验
 */
import logger from '#logger';
import mongoose from 'mongoose';
import config from '#config/system';
import { verifyJwt } from '#utils/encryption';

/**
 * 设置用户信息(到koa.state)
 * @param {Object} ctx        koa 上下文
 */
const setUserInfoToState = async ({ ctx }) => {
  const token = ctx.request.header.authorization;
  const roleServer = mongoose.model('Role');
  const userServer = mongoose.model('User');

  // 1. 验证 token: payload 为对象
  const payload = await verifyJwt(token);

  // 2. 获取用户: token 对应用户 || 默认用户
  let user = payload.id
    ? await userServer.findOne({ _id: payload.id })
    : null;

  // 2.1 如果 token 错误或者数据更新可能 id 错误找不到用户时则使用默认用户
  user = user
    ? user
    : await userServer.findOne({ account: config.defaultUser });

  // 3. 获取用户角色
  const role = user?.role ? await roleServer.findOne({ _id: user.role }) : {};

  // 4. 设置 koa 状态: ctx.state.user ctx.state.role
  ctx.state.role = (role || {});
  ctx.state.user = (user || {});

  // 4. 打印输出用户信息
  logger.info(`中间件/用户信息: ${JSON.stringify(ctx.state, null, 4)}`);
};

// 用户身份校验、api 校验
export default async (ctx, next) => {
  await setUserInfoToState({ ctx });
  await next();
};
