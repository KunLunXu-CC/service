// 用户身份校验、api 校验
import logger from '#logger';
import mongoose from 'mongoose';
import { verifyJwt } from '#utils/encryption';
import { DEFAULT_USER_NAME } from '#config/constants';

/**
 * 设置用户信息(到koa.state)
 *
 * @param {object} params 参数
 * @param {object} params.ctx  koa 上下文
 */
const setUserInfoToState = async ({ ctx }) => {
  const token = ctx.cookies.get('jwt_token');

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
    : await userServer.findOne({ account: DEFAULT_USER_NAME });

  // 3. 获取用户角色
  const role = user?.role ? await roleServer.findOne({ _id: user.role }) : {};

  // 4. 设置 koa 状态: ctx.state.user ctx.state.role
  ctx.state.role = (role || {});
  ctx.state.user = (user || {});

  // 4. 打印输出用户信息
  logger({ ctx, label: '中间件/用户信息', message: ctx.state });
};

// 用户身份校验、api 校验
export default async (ctx, next) => {
  await setUserInfoToState({ ctx });
  await next();
};
