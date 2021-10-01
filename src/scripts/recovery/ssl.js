const shell = require('shelljs');

// 恢复 SSL 文件
module.exports = {
  name: '恢复 SSL',
  exec: async ({ dest }) => {
    console.log('开始恢复 SSL 文件！');

    if (shell.exec(`
      sudo cp -f ${dest}/ssl/ssl.* ${new URL('../../docker/nginx', import.meta.url).pathname}
    `).code === 0) {
      console.log('SSL 文件恢复完成');
    }
  },
};
