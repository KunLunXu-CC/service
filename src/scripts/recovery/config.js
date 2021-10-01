const shell = require('shelljs');

// 恢复配置文件(production.js)
module.exports = {
  name: '恢复配置文件(production.js)',
  exec: async ({ dest }) => {
    console.log('开始恢复配置文件！');

    if (shell.exec(`
      sudo cp -f ${dest}/config/production.js ${new URL('../../config/system/production.js', import.meta.url).pathname}
    `).code === 0) {
      console.log('配置文件已恢复');
    }
  },
};
