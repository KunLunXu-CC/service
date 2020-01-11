const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');

module.exports = async ({ body, header }) => {
  const { repository, ref } = body;
  // 1. 提示: 脚本开始
  console.log(`=======>>>> [webhooks] ${repository.name}: submit new code <<<<=======`.green);

  // 2. 条件判断： 只有 master 分支代码的提交才做更新
  if (ref !== 'refs/heads/master'){
    console.log('[fail][2] 提交非 master 分支代码');
    return false;
  }

  // 3. 进入项目目录
  shell.cd('html');

  // 4. 撤销 git 的所有本地修改
  if (shell.exec(`
    git fetch --all  && \
    git reset --hard origin/master  && \
    git clean -df && \
  `).code !== 0) {
    console.log('[fail][4] 撤销 git 的所有本地修改失败');
    return false;
  }

  // 5. 拉取代码
  if (shell.exec('git pull').code !== 0) {
    console.log('[fail][5] 拉取代码失败');
    return false;
  }

  // 6. 安装依赖
  if (shell.exec('npm i').code !== 0) {
    console.log('[fail][6] 安装依赖失败');
    return false;
  }

  // 6. 打包编译
  if (shell.exec('npm run build').code !== 0) {
    console.log('[fail][4] 打包编译失败');
    return false;
  }

  // 6. 设置权限
  shell.chmod(755, '-R', '.');

  // 7. 提示：完成
  console.log(`=======>>>> [webhooks] ${repository.name}: success <<<<=======`.green);
}
