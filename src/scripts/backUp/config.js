const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');

// 备份配置文件
module.exports = {
  name: '备份配置文件(production.js)',
  exec: async ({ dest }) => {
    console.log('开始备份配置文件！');

    if (shell.exec(`
      # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
      sudo rm -rf ${dest}/config
      sudo mkdir -p ${dest}/config

      # 备份文件
      sudo cp ${path.resolve(__dirname, '../../config/system/production.js')} ${dest}/config/production.js
    `).code === 0) {
      console.log('配置文件备份完成, 备份路径: ', chalk.green(`${dest}/config/production.js`));
    }
  },
};
