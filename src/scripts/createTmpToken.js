import mongoose from 'mongoose';
import { signJwt } from '#utils/encryption';

// 获取临时 token: 1天
export default {
  name: '创建临时 Token',
  exec: async () => {
    const account = 'admin';
    const expiresIn = '7d';

    const { id, name, role } = await mongoose.model('User').findOne({ account });

    const token = await signJwt({
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
