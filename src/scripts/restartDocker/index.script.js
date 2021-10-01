const shelljs = require('shelljs');

module.exports = {
  name: '重启 Docker',
  exec: async () => {
    shelljs.exec(`sh ${new URL('./shell.sh', import.meta.url).pathname}`);
  },
};
