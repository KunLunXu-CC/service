import { hash } from '#utils/encryption';
import { ROLE_TYPE, PHOTO_TYPE } from '#config/constants';
import create from '#service/common/create';

const ROLE_AUTH_TOURIST = {
  用户: 'user',
  基金: 'fund',
  阅读: 'reader',
  系统偏好设置: 'setting',
};

const ROLE_AUTH_ADMIN = {
  AI: 'ai',
  用户: 'user',
  基金: 'fund',
  相册: 'album',
  日记: 'diary',
  阅读: 'reader',
  编辑器: 'editor',
  日志: 'logger',
  系统偏好设置: 'setting',
  文章: 'article',
};

const USER_MAP_ROLE = {
  [ROLE_TYPE.ADMIN]: {
    // role: '',
    name: '管理员',
    account: 'admin',
    password: hash({ data: '123456' }),
  },
  [ROLE_TYPE.TOURIST]: {
    name: '游客',
    account: 'tourist',
    password: hash({ data: '123456' }),
  },
};

export default {
  name: '初始化数据库',
  exec: async () => {
    // 1. 初始化角色
    const { change: roles } = await create({
      model: 'Role',
      body: [
        {
          desc: '游客',
          name: 'tourist',
          type: ROLE_TYPE.TOURIST,
          auth: Object.entries(ROLE_AUTH_TOURIST).map(([name, code]) => ({
            name,
            code,
            readable: true,
            writable: true,
          })),
        },
        {
          name: 'admin',
          desc: '管理员',
          type: ROLE_TYPE.ADMIN,
          auth: Object.entries(ROLE_AUTH_ADMIN).map(([name, code]) => ({
            name,
            code,
            readable: true,
            writable: true,
          })),
        },
      ],
    });

    console.log('%c [ 初始化角色 ]-54', 'font-size:13px; background:pink; color:#bf2c9f;', roles);

    // 2. 初始化用户
    const { change: users } = await create({
      model: 'User',
      body: roles.map((v) => {
        const base = USER_MAP_ROLE[v.type];
        return {
          ...base,
          role: v.id,
        };
      }),
    });

    console.log('%c [ 初始化用户 ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', users);

    // 3. 初始化图: 背景图、头像
    const { change: photos } = await create({
      model: 'Photo',
      body: [
        {
          type: PHOTO_TYPE.DESKTOP,
          name: 'pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg',
          sourceFileName: 'pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg',
        },
        {
          type: PHOTO_TYPE.AVATAR,
          name: 'pro.MjAyMC0wMS0wMV8xNC0zNy5wbmcxNTc3ODc0ODgwNjk4.png',
          sourceFileName: 'pro.MjAyMC0wMS0wMV8xNC0zNy5wbmcxNTc3ODc0ODgwNjk4.png',
        },
      ],
    });

    console.log('%c [ 初始化图: 背景图、头像 ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', photos);
  },
};
