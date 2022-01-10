import inquirer from 'inquirer';

import mongoose from 'mongoose';
import { importFiles } from '#utils/fs';
import { STATUS } from '#config/consts';

export default {
  name: '清理数据(删除假删数据)',
  exec: async () => {
    // 1. 读取表, 并选择要清除的表
    const files = importFiles({
      dir: new URL('../../models', import.meta.url).pathname,
    });
    const { dbList } = await inquirer.prompt([
      {
        choices: Object.entries(files).map(([value, { title: name }]) => ({
          name,
          value,
        })),
        type: 'checkbox',
        name: 'dbList',
        message: '选择要清除的数据表',
      },
    ]);

    // 2. 删除数据
    for (const key of dbList) {
      await mongoose.model(key).remove({ status: STATUS.DELETE });
    }
  },
};
