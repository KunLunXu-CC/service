const path = require('path');
const shell = require('shelljs');
const logger = require('../../../utils/logger');

module.exports = async ({ body, header }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){
    logger.info('[webhooks] 提交非 master 分支代码, 结束!');
    return false;
  }

  // 1. 提示: 脚本开始
  logger.info(`=======>>>> [webhooks] ${repository.name}: submit new code <<<<=======`)

  // 2. 进入项目目录
  shell.cd(path.resolve(__dirname, '../../../docker/nginx/html'));
  logger.info(`1. [success] 进入项目目录 ${shell.pwd()}`);

  // 3. 撤销 git 的所有本地修改
  if (shell.exec(`
    git fetch --all  && \
    git reset --hard origin/master  && \
    git clean -df
  `).code !== 0) {
    logger.info('2. [fail] 撤销 git 的所有本地修改失败');
    return false;
  }
  logger.info('2. [success] 撤销 git 的所有本地修改成功');

  // 4. 拉取代码
  if (shell.exec('git pull').code !== 0) {
    logger.info('3. [fail] 拉取代码失败');
    return false;
  }
  logger.info('3. [success] 拉取代码成功');

  // 5. 安装依赖
  const env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'development';
  if (shell.exec(`rm -rf node_modules package-lock.json && npm i`).code !== 0) {
    logger.info('4. [fail] 安装依赖失败');
    process.env.NODE_ENV = env;
    return false;
  }
  process.env.NODE_ENV = env;
  logger.info('4. [success] 安装依赖成功');

  logger.info('5. [success] ------------->>> 项目开始打包:');
  // 6. 打包编译
  if (shell.exec('npm run build:pro').code !== 0) {
    logger.info('5. [fail] 打包编译失败');
    return false;
  }
  logger.info('5. [success] 打包编译成功');

  // 7. 设置权限
  shell.chmod('-R', 777, '.');
  logger.info('6. [success] 设置权限成功');

  // 8. 提示：完成
  logger.info(`=======>>>> [webhooks] ${repository.name}: success new code <<<<=======`)
}
