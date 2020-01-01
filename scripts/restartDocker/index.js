const shelljs = require('shelljs');
const path = require('path');

module.exports = async () => {
  shelljs.exec(`sh ${path.resolve(__dirname, './shell.sh')}`);
}
