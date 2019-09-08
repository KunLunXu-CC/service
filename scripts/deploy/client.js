const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const shell = require('shelljs');

module.exports = gulp.series(async () => {
  try {
    shell.cd(path.resolve(__dirname, '../../'));
    shell.exec(`
      pm2 delete all
      git pull
      rm -rf node_modules
      rm -rf package-lock.json
      npm i
      pm2 start ecosystem.config.js
      chmod -R 777 .
    `);
  } catch(e){}
});
