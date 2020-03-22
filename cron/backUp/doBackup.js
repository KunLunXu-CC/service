const path = require('path');
const shell = require('shelljs');
const moment = require('moment');

const { mkdirPath, readFileList } = require('../../utils');

// 备份文件, 返回备份文件路径
module.exports = () => {
  let backUpPath = '';  // 备份文件路径

  // 1. 备份配置文件
  mkdirPath('/tmp/backUp/config');
  shell.cp(
    '-rf',
    path.resolve(__dirname, '../../config/system/production.js'),
    '/tmp/backUp/config/production.js'
  );

  // 2. 备份 ssl
  mkdirPath('/tmp/backUp/ssl');
  shell.cp(
    '-rf',
    path.resolve(__dirname, '../../docker/nginx/ssl.*'),
    '/tmp/backUp/ssl'
  );

  // 3. 备份静态资源
  mkdirPath('/tmp/backUp/static');
  shell.cp(
    '-rf',
    path.resolve(__dirname, '../../app/static/*'),
    '/tmp/backUp/static'
  );

  // 4. 备份数据库
  mkdirPath('/tmp/backUp/databases');
  // 4.1 读取所有 mongo 备份文件并进行排序
  const mongoBackups = readFileList(
    path.resolve(__dirname, '../../docker/store/mongo/backups/')
  ).sort((a, b) => b.localeCompare(a))[0];
  mongoBackups && shell.exec(`tar zxvf ${mongoBackups} -C /tmp/backUp/databases`);

  // 5 压缩备份文件
  backUpPath = `/tmp/backUp_${moment().format('YYYY_MM_DD__hh_mm_ss')}.tar.gz`;
  shell.exec(`cd /tmp/backUp &&tar -zcvf ${backUpPath} ./*`);

  // 6. 删除临时备份目录
  shell.rm('-rf', `/tmp/backUp`);

  return backUpPath;
}
