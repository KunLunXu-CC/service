const inquirer = require('inquirer');

// 选项
const choices = [
  {
    name: '备份数据库',
    exec: require('./databases'),
  },
];

module.exports = {
  name: '备份数据',
  exec: async () => {
    const { dest, execNames } = await inquirer.prompt([
      {
        name: 'dest',
        type: 'input',
        default: '~/backUp/',
        message: '备份文件存储目录',
      },
      {
        choices,
        type: 'checkbox',
        name: 'execNames',
        message: '选择要备份的内容',
      },
    ]);

    // 执行所有脚本
    execNames.forEach( async name => {
      const exec = choices.find(v => v.name === name).exec;
      await exec({ dest });
    });
  },
};
