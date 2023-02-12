import inquirer from 'inquirer';

// import mongoose from 'mongoose';
import { importFiles } from '#utils/fs';

export default {
  name: '清理数据(删除假删数据)',
  exec: async () => {
    // 1. 读取表, 并选择要清除的表
    const files = await importFiles({
      dir: new URL('../mongo/models', import.meta.url).pathname,
    });

    const { dbList } = await inquirer.prompt([
      {
        choices: files.map(({ fileName: value }) => ({ value })),
        type: 'checkbox',
        name: 'dbList',
        message: '选择要清除的数据表',
      },
    ]);

    // 2. 删除数据
    for (const key of dbList) {
      console.log('%c [ key ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', key);
    }
  },
};
