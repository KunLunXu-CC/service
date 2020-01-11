const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');

module.exports = async ({ body, header }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){
    console.log('[webhooks] 提交非 master 分支代码');
    return false;
  }

  // 1. 提示: 脚本开始
  console.log(`=======>>>> [webhooks] ${repository.name}: submit new code <<<<=======`);

  // 2. 进入项目目录
  shell.cd('html');
  console.log('1. [success] 进入项目目录');

  // 3. 撤销 git 的所有本地修改
  if (shell.exec(`
    git fetch --all  && \
    git reset --hard origin/master  && \
    git clean -df
  `).code !== 0) {
    console.log('2. [fail] 撤销 git 的所有本地修改失败');
    return false;
  }
  console.log('2. [success] 撤销 git 的所有本地修改成功');

  // 4. 拉取代码
  if (shell.exec('git pull').code !== 0) {
    console.log('3. [fail] 拉取代码失败');
    return false;
  }
  console.log('3. [success] 拉取代码成功');

  // 5. 删除依赖
  shell.rm('-rf', 'node_modules', 'package-lock.json');
  console.log('4. [success] 删除依赖成功');

  // 6. 安装依赖
  if (shell.exec('npm i && npm i --only=dev').code !== 0) {
    console.log('5. [fail] 安装依赖失败');
    return false;
  }
  console.log('5. [success] 安装依赖成功');

  // 7. 打包编译
  if (shell.exec('npm run build').code !== 0) {
    console.log('6. [fail] 打包编译失败');
    return false;
  }
  console.log('6. [success] 打包编译成功');

  // 8. 设置权限
  shell.chmod(755, '-R', '.');
  console.log('7. [success] 设置权限成功');

  // 8. 提示：完成
  console.log(`=======>>>> [webhooks] ${repository.name}: success <<<<=======`);
}
