const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');

// 备份 SSL 文件
module.exports = {
  name: '备份 SSL',
  exec: async ({ dest }) => {
    console.log('开始备份 SSL 文件！');

    if (shell.exec(`
      # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
      sudo rm -rf ${dest}/ssl
      sudo mkdir -p ${dest}/ssl

      # 备份文件
      sudo cp ${path.resolve(__dirname, '../../docker/nginx/ssl.*')} ${dest}/ssl/
    `).code === 0) {
      console.log('SSL 文件备份完成, 备份路径: ', chalk.green(`${dest}/ssl`));
    }
  },
};
