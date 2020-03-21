const path = require('path');
const shell = require('shelljs');
const { mkdirPath } = require('../../utils');

//　恢复静态目录 app/static
module.exports = {
  name: '恢复静态目录 app/static',
  exec: async ({ dest }) => {
    mkdirPath(path.resolve(__dirname, '../../app/static'));
    if (shell.exec(`
      sudo cp -rf ${dest}/static/* ${path.resolve(__dirname, '../../app/static')}
    `).code === 0) {
      console.log('静态目录已恢复');
    }
  }
};
