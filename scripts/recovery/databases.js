const shell = require('shelljs');

//　恢复数据库
module.exports = {
  name: '恢复数据库',
  exec: async ({ dest }) => {
    // 1. 备份 mongo.blog 数据
    console.log(`开始恢复数据库！`);
    if (shell.exec(`
      # 将备份文件拷贝到容器内
      sudo docker cp ${dest}/databases/blog blog-mongo:/backUp

      # 执行 docker 内部命令进行数据恢复
      sudo docker exec blog-mongo sh -c 'mongorestore -d blog --drop /backUp'

      # 删除容器内的临时文件
      sudo docker exec blog-mongo sh -c 'rm -rf /backUp'
    `).code === 0) {
      console.log('恢复数据库完成');
    }
  }
};
