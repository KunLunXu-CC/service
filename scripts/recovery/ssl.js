const path = require('path');
const shell = require('shelljs');

//　恢复 SSL 文件
module.exports = {
  name: '恢复 SSL',
  exec: async ({ dest }) => {
    console.log(`开始恢复 SSL 文件！`);
    if (shell.exec(`
      sudo cp -f ${dest}/ssl/ssl.crt ${path.resolve(__dirname, '../../docker/nginx/ssl.crt')}
      sudo cp -f ${dest}/ssl/ssl.key ${path.resolve(__dirname, '../../docker/nginx/ssl.key')}
    `).code === 0) {
      console.log('SSL 文件恢复完成');
    }
  }
};
