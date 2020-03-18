const shelljs = require('shelljs');
const path = require('path');

module.exports = {
  name: '重启 Docker',
  exec: async () => {
    shelljs.exec(`sh ${path.resolve(__dirname, './shell.sh')}`);
  },
};
