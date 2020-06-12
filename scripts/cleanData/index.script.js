const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const mongo = require('../../utils/mongo');
const { requireFiles, delayed } = require('../../utils');
const { STATUS } = require('../../config/consts');

module.exports = {
  name: '清理数据(删除假删数据)',
  exec: async () => {
    // 1. 连接数据库
    const db = mongo();
    const spinner = ora('连接数据库中……').start();
    await delayed(1000 * 10);
    spinner.stop();

    // 2. 读取表, 并选择要清除的表
    const files = requireFiles({
      dir: path.resolve(__dirname, '../../models'),
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

    // 3. 删除数据
    for(let key of dbList){
      await db[key].remove({ status: STATUS.DELETE });
    }
  },
};
