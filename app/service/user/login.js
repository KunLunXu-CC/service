const _ = require('lodash');
const { RESCODE } = require('../../../config/conts');
const { defaultUser } = require('../../../config/system');
const { hash, decryptRsa, signJwt, verifyJwt } = require('../../../utils/encryption');

// 在响应请求头中 token 的键值
const TOKEN_HEADER_KEY = 'cache-token';

/**
 * 获取用户信息
 * @param {String} account    账号
 * @param {String} password   密码
 * @param {Object} ctx        koa 上下文
 * @returns {Object}          返回用户登录状态(用户信息 || null)
 */
const getUserInfo = async ({ account, password, ctx }) => {
  const userServer = ctx.db.mongo.User;
  const token = ctx.request.header[TOKEN_HEADER_KEY];

  if (!!account && !!password){
    // 1. 进行账号密码验证
    const decryptPassword = hash({ data: decryptRsa(password) });
    return await userServer.findOne({ password: decryptPassword, account});
  } else if (token){
    // 2. 进行 token 验证
    const payload = await verifyJwt(token) || {};
    return await userServer.findOne({ _id: payload.id });
  }
};

/**
 * 设置状态 ctx.state = {user, role};
 * @param {Object} user             当前用户 
 * @param {Object} ctx              koa 上下文
 */
const setState = async ({ user, ctx }) => {
  const roleServer = ctx.db.mongo.Role;
  user.role && (ctx.state.role = await roleServer.findOne({ _id: user.role }));
  ctx.state.user = user;
};

/**
 * 发送证书: 添加 token 至响应头
 * @param {Object} user             当前用户 
 * @param {Object} ctx              koa 上下文
 */
const sendCertificate = ({ user, ctx }) => {
  const token = signJwt({
    id: user.id,
    name: user.name,
    role: user.role,
    account: user.account,
  });
  ctx.set(TOKEN_HEADER_KEY, token);
};

/**
 * 用户登录入口
 * @param {String} account    账号
 * @param {String} password   密码
 * @param {Object} ctx        koa 上下文
 */
module.exports = async ({ account, password, ctx }) => {
  const userServer = ctx.db.mongo.User;
  const data = {
    user: null,
    message: '登录成功!',
    rescode: RESCODE.SUCCESS,
  };
  // 1. 获取当前用户数据
  data.user = await getUserInfo({ account, password, ctx });
  // 2. 更新 data
  if (!data.user){
    data.rescode = RESCODE.FAIL;
    data.user = await userServer.findOne({ account: defaultUser });
    data.message = '账号密码错误或者身份凭证过期, 将以游客身份进行登录!';
  }
  // 3. 设置状态 ctx.state.user ctx.state.role
  await setState({ user: data.user, ctx });
  // 4. 发送证书
  sendCertificate({ user: data.user, ctx });
  return data;
};
