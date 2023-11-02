import create from '#service/common/create';
import update from '#service/common/update';
import { ROLE_TYPE, DEFAULT_ROLE_NAME } from '#config/constants';

// 临时脚本
export default {
  name: '临时脚本',
  exec: async () => {
    // 1. 创建 normal 角色
    await create({
      model: 'Role',
      body: [{
        auth: [],
        desc: '标准角色',
        name: DEFAULT_ROLE_NAME,
        type: ROLE_TYPE.NORMAL,
      }],
    });

    // 2. 修改 admin 数据
    await update({
      model: 'User',
      conds: {
        account: 'admin',
      },
      body: {
        name: '墨渊君',
        githubId: '23526706',
        account: 'MoYuanJun',
        bio: '善战者无赫赫之功',
        avatar: 'https://avatars.githubusercontent.com/u/23526706?v=4',
      },
    });
  },
};
