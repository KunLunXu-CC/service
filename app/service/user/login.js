const _ = require('lodash');

const { RESCODE } = require('../../../config/conts');
const { hash, decryptRsa } = require('../../../utils/encryption');

/**
 * 用户登录
 * @param {String} account    账号
 * @param {String} password   密码
 * @param {Object} ctx        koa 上下文
 */
module.exports = async ({ account, password, ctx }) => {
  const userServer = ctx.db.mongo.User;
  const roleServer = ctx.db.mongo.Role;
  const data = { user: {}, rescode: RESCODE.FAIL, message: '登录失败' };

  // 1. 判断是否输入账号、密码： 有则进行账号密码验证
  if (!!account && !!password){
    const decryptPassword = decryptRsa(password);
    if (!!decryptPassword){
      const conds = { account, password: hash({ data: decryptPassword })};
      data.user = await userServer.findOne(conds) || {};
    };
  }

  // 2. 判断用户是否带有 token: 有则进行 token 验证
  
  // 3. 是否获取到当前用户信息: 成功则挂载用户信息到 ctx.state、并设置登录状态
  if(!_.isEmpty(data.user)){
    data.message = '登录失败';
    data.rescode = RESCODE.FAIL;
    ctx.state.user = data.user;
  }

  // 4. 判断用户是否绑定角色: 有则查询对应角色应挂载到 ctx.state
  if (!_.isEmpty(data.user) && data.user.role){
    ctx.state.role = await roleServer.findOne({ _id: data.user.role });
  }

  return data;
};
