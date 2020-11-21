const mongoDB = require('../../utils/mongo');
const { signJwt } = require('../../utils/encryption');

// 获取临时 token: 1天
module.exports = {
  name: '创建临时 Token',
  exec: async () => {
    const account = 'admin';
    const expiresIn = '1d';

    const { id, name, role } = await mongoDB.User.findOne({ account });

    const token = signJwt({
      id,
      name,
      role,
      account,
    }, expiresIn);
    console.log(`---- 生成临时 token, 账号: ${account} 时长: ${expiresIn}  ------\n`);
    console.log(token);
    console.log('\n----- 结束分隔符 -----');
  },
};
