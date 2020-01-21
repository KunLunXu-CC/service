const fs = require('fs');
const path = require('path');
const mongo = require('../../utils/mongo');
const { createRasKey, signJwt } = require('../../utils/encryption');

// 创建公钥、私钥
module.exports.createSecretKey = async () => {
  const { private, public } = createRasKey();
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/private.key'),
    private,
    'utf-8'
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/public.key'),
    public,
    'utf-8'
  );
}

// 获取临时 token
module.exports.createTmpToken = async () => {
  const account = 'admin';
  const expiresIn = '1d';

  const mongoDB = mongo();
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
}
