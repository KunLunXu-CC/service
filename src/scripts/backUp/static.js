const chalk = require('chalk');
const shell = require('shelljs');

// 备份静态目录
module.exports = {
  name: '备份静态目录',
  exec: async ({ dest }) => {
    console.log('开始备份静态目录！');

    if (shell.exec(`
      # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
      sudo rm -rf ${dest}/static
      sudo mkdir -p ${dest}/static

      # 备份文件
      sudo cp -rf ${new URL('../../static/*', import.meta.url).pathname} ${dest}/static
    `).code === 0) {
      console.log('静态目录备份完成, 备份路径: ', chalk.green(`${dest}/static`));
    }
  },
};
