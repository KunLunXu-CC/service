import mongoose from 'mongoose';
import { DEFAULT_USER_NAME } from '#config/constants';
import { hash, decryptRsa, signJwt } from '#utils/encryption';

/**
 * 发送证书: 添加 token 至响应头
 *
 * @param {object} params 参数
 * @param {object} params.user  当前用户
 * @param {object} params.ctx   koa 上下文
 */
export const sendCertificate = async ({ user, ctx }) => {
  const token = await signJwt({
    id: user.id,
    name: user.name,
    account: user.account,
  });

  // 设置 token 时长 7 天
  ctx.cookies.set('jwt_token', token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
};

/**
 * 用户登录入口
 *
 *@param {object} params 参数
 * @param {string} params.account    账号
 * @param {string} params.password   密码
 * @param {object} params.ctx        koa 上下文
 */
export default async ({ account, password, ctx }) => {
  const userServer = mongoose.model('User');
  const roleServer = mongoose.model('Role');

  const data = {
    user: null,
    message: '登录成功!',
  };

  // 1. 账号密码登录
  if (!!account && !!password) {
    const decryptPassword = hash({ data: await decryptRsa(password) });
    data.user = await userServer.findOne({
      account,
      password: decryptPassword,
    });
  }

  // 2. 登录失败
  if (!data.user) {
    data.message = '账号或者密码错误';
    data.user = await userServer.findOne({ account: DEFAULT_USER_NAME }); // 取默认用户
  }

  // 3. 更新 koa state
  ctx.state.user = data.user;
  ctx.state.role = await roleServer.findOne({ _id: data.user.role });

  // 4. 发送证书 JWT
  await sendCertificate({ user: data.user, ctx });

  console.log('%c [ ctx.state.role ]-64', 'font-size:13px; background:pink; color:#bf2c9f;', ctx.state.role);
  return data;
};
