import create from '#service/common/create';
import update from '#service/common/update';
import findOne from '#service/common/findOne';
import { ROLE_TYPE, DEFAULT_ROLE_NAME } from '#config/constants';

const COMMON_AUTH = [
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
];

const ADMIN_AUTH = [
  {
    readable: 1,
    writable: 1,
    name: 'AI',
    code: 'ai',
  },
  {
    readable: 1,
    writable: 1,
    name: '相册',
    code: 'album',
  },
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
    name: '鉴查院',
    code: 'monitoring',
  },
  {
    readable: 1,
    writable: 1,
    code: 'setting',
    name: '偏好设置',
  },
  {
    readable: 1,
    writable: 1,
    code: 'user',
    name: '用户管理',
  },
];

// 临时脚本
export default {
  name: '临时脚本',
  needMongo: true,
  exec: async () => {
    // 1. 创建 common 角色
    const { change: [commonRole] } = await create({
      model: 'Role',
      body: [{
        auth: COMMON_AUTH,
        desc: '普通角色',
        name: DEFAULT_ROLE_NAME,
        type: ROLE_TYPE.COMMON,
      }],
    });
    console.log('1. 创建 common 角色:', commonRole);

    // 2. 修正 admin 角色的权限
    const { change: [changeAdmin] } = await update({
      model: 'Role',
      conds: {
        name: 'admin',
      },
      body: { auth: ADMIN_AUTH  },
    });
    console.log('2. 修正 admin 角色的权限:', changeAdmin);

    // 3. 获取 admin 用户数据(后面基于它, 创建新的 admin)
    const { data: currentAdminUser } = await findOne({
      model: 'User',
      search: { account: 'admin' },
    });
    console.log('3. 当前 admin 数据:', currentAdminUser);

    // 4. 用户 admin => 墨渊君
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
    console.log('4. 用户墨渊君:', moYuanJunUser);

    // 5. 创建 admin 用户(除了名字 ID 都用上面 👆🏻 的数据)
    const { change: [adminUser] } = await create({
      model: 'User',
      body: [{
        name: '管理员',
        role: currentAdminUser.role,

        account: 'admin',
        password: currentAdminUser.password,
      }],
    });
    console.log('5. 创建 admin 用户:', adminUser);

    // 6. 文件夹, 设置创建者、修改者
    const { change: [folders] } = await update({
      model: 'Folder',
      body: {
        updater: moYuanJunUser.id,
        creator: moYuanJunUser.id,
      },
    });
    console.log('6. 文件夹, 设置创建者、修改者:', folders);

    // 7. 文章, 设置创建者、修改者
    const { change: [articles] } = await update({
      model: 'Article',
      body: {
        updater: moYuanJunUser.id,
        creator: moYuanJunUser.id,
      },
    });
    console.log('7. 文章, 设置创建者、修改者:', articles);

    // 8. 日记, 设置创建者、修改者
    const { change: [diary] } = await update({
      model: 'Diary',
      body: {
        updater: moYuanJunUser.id,
        creator: moYuanJunUser.id,
      },
    });
    console.log('8. 日记, 设置创建者、修改者:', diary);
  },
};
