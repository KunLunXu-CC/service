const inquirer = require('inquirer');

module.exports = {
  name: '备份数据',
  exec: async () => {
    const { dest } = await inquirer.prompt([
      {
        name: 'dest',
        type: 'input',
        default: '~/backUp/',
        message: '备份文件存储目录',
      },
      {
        type: 'list',
        name: 'script',
        choices: [
          {
            name: '',
          },
        ],
        message: '选择要备份的内容',
      }
    ]);
    console.log('拷贝文件路径', dest);
  },
};
