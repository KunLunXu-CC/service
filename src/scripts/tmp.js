import create from '#service/common/create';
import update from '#service/common/update';
import findOne from '#service/common/findOne';
import { ROLE_TYPE, DEFAULT_ROLE_NAME } from '#config/constants';

// 临时脚本
export default {
  name: '临时脚本',
  exec: async () => {
    // 1. 创建 common 角色
    const { change: [commonRole] } = await create({
      model: 'Role',
      body: [{
        auth: [
          {
            readable: 1,
            writable: 1,
            name: '编辑器',
            code: 'editor',
          },
          {
            readable: 1,
            writable: 1,
            name: '阅读',
            code: 'reader',
          },
          {
            readable: 1,
            writable: 1,
            name: '日记',
            code: 'diary',
          },
          {
            readable: 1,
            writable: 1,
            code: 'setting',
            name: '偏好设置',
          },
        ],
        desc: '普通角色',
        name: DEFAULT_ROLE_NAME,
        type: ROLE_TYPE.COMMON,
      }],
    });
    console.log('创建 common 角色:', commonRole);

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
        role: commonRole.id,
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
