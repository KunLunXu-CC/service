const path = require('path');
const shell = require('shelljs');

//　恢复静态目录 app/static
module.exports = {
  name: '恢复静态目录 app/static',
  exec: async ({ dest }) => {
    console.log(`开始恢复静态目录！`);
    shell.exec(`sudo rm -rf ${path.resolve(__dirname, '../../app/static')}`);
    if (shell.exec(`
      sudo mkdir ${path.resolve(__dirname, '../../app/static')}
      sudo cp -rf ${dest}/static/* ${path.resolve(__dirname, '../../app/static')}
    `).code === 0) {
      console.log('静态目录已恢复');
    }
  }
};
