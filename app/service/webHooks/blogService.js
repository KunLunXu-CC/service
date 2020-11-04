const path = require('path');
const shell = require('shelljs');
const logger = require('../../../utils/logger');

module.exports = async ({ body }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){
    logger.info('[webhooks] 提交非 master 分支代码, 结束!');
    return false;
  }

  // 1. 提示: 脚本开始
  logger.info(`=======>>>> [webhooks] ${repository.name}: submit new code <<<<=======`)

  // 2. 进入项目目录
  shell.cd(path.resolve(__dirname, '../../../'));
  logger.info(`1. [success] 进入项目目录: ${shell.pwd()}`);

  // 6. 设置权限
  shell.chmod('-R', 777, '.');
  logger.info('4. [success] 设置权限成功');

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

  // 6. 设置权限
  shell.chmod('-R', 777, '.');
  logger.info('4. [success] 设置权限成功');

  // 5. 安装依赖: npm i 安装生产环境下依赖、--only=dev 则是安装开发环境下依赖
  const env = process.env.NODE_ENV;
  process.env.NODE_ENV = 'development';
  console.log('rm package-lock.json && npm i');
  if (shell.exec('rm package-lock.json && npm i').code !== 0) {
    logger.info('5. [fail] 安装依赖失败');
    process.env.NODE_ENV = env;
    return false;
  }
  process.env.NODE_ENV = env;
  logger.info('5. [success] 安装依赖成功');

  // 7. 提示：完成
  logger.info(`=======>>>> [webhooks] ${repository.name}: success <<<<=======`)

  logger.info('6. [success] 接下来将重启应用');
  logger.info(`当前位置: ${shell.pwd()}`);
  // 8. 重启
  if (shell.exec('npm run restart:pro').code !== 0) {
    logger.info('6. [fail] 重启失败');
    return false;
  }
}
