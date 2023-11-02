import create from '#service/common/create';
import update from '#service/common/update';
import findOne from '#service/common/findOne';
import { ROLE_TYPE, DEFAULT_ROLE_NAME } from '#config/constants';

// 临时脚本
export default {
  name: '临时脚本',
  exec: async () => {
    // 1. 创建 normal 角色
    const { change: [normalRole] } = await create({
      model: 'Role',
      body: [{
        auth: [],
        desc: '标准角色',
        name: DEFAULT_ROLE_NAME,
        type: ROLE_TYPE.NORMAL,
      }],
    });
    console.log('创建 normal 角色:', normalRole); //

    // 2. 获取 admin 用户数据(后面基于它, 创建新的 admin)
    const { data: currentAdminUser } = await findOne({
      model: 'User',
      search: { account: 'admin' },
    });
    console.log('当前 admin 数据:', currentAdminUser);

    // 3. 用户 admin => 墨渊君
    const { change: [moYuanJunUser] } = await update({
      model: 'User',
      conds: {
        account: 'admin',
      },
      body: {
        name: '墨渊君',
        role: normalRole.id,
        githubId: '23526706',
        account: 'MoYuanJun',
        bio: '善战者无赫赫之功',
        avatar: 'https://avatars.githubusercontent.com/u/23526706?v=4',
      },
    });
    console.log('用户墨渊君:', moYuanJunUser);

    // 4. 创建 admin 用户(除了名字 ID 都用上面 👆🏻 的数据)
    const { change: [adminUser] } = await create({
      model: 'User',
      body: [{
        name: '管理员',
        role: currentAdminUser.role,

        account: 'admin',
        password: currentAdminUser.password,
      }],
    });
    console.log('创建 admin 用户:', adminUser);
  },
};
