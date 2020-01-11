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

  // 2. 撤销 git 的所有本地修改
  if (shell.exec(`
    git fetch --all  && \
    git reset --hard origin/master  && \
    git clean -df
  `).code !== 0) {
    console.log('1. [fail] 撤销 git 的所有本地修改失败');
    return false;
  }
  console.log('1. [success] 撤销 git 的所有本地修改成功');

  // 3. 拉取代码
  if (shell.exec('git pull').code !== 0) {
    console.log('2. [fail] 拉取代码失败');
    return false;
  }
  console.log('2. [success] 拉取代码成功');


  // 4. 安装依赖
  if (shell.exec('npm i').code !== 0) {
    console.log('3. [fail] 安装依赖失败');
    return false;
  }
  console.log('3. [success] 安装依赖成功');

  // 5. 设置权限
  shell.chmod(755, '-R', '.');
  console.log('4. [success] 设置权限成功');

  // 6. 提示：完成
  console.log(`=======>>>> [webhooks] ${repository.name}: success <<<<=======`);
}
