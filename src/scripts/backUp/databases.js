const chalk = require('chalk');
const shell = require('shelljs');

// 备份数据库
module.exports = {
  name: '备份数据库',
  exec: async ({ dest }) => {
    // 1. 备份 mongo.blog 数据
    console.log('开始备份 blog 数据！');

    if (shell.exec(`
      # 执行 docker 内部命令进行备份数据
      sudo docker exec blog-mongo sh -c 'mongodump -d blog -o /backUp'

      # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
      sudo rm -rf ${dest}/databases/blog
      sudo mkdir -p ${dest}/databases

      # 从容器内将备份数据复制到宿主机器
      sudo docker cp blog-mongo:/backUp/blog ${dest}/databases

      # 执行 docker 命令, 删除容器内的备份数据
      sudo docker exec blog-mongo sh -c 'rm -rf /backUp'
    `).code === 0) {
      console.log('blog 数据备份完成, 备份路径: ', chalk.green(`${dest}/databases/blog`));
    }
  },
};
