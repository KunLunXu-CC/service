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
    console.log('[fail][2] 提交非 master 分支代码'.red);
    return false;
  }

  // 3. 撤销 git 的所有本地修改
  if (shell.exec(`
    git fetch --all  && \
    git reset --hard origin/master  && \
    git clean -df && \
  `).code !== 0) {
    console.log('[fail][3] 撤销 git 的所有本地修改失败'.red);
    return false;
  }

  // 4. 拉取代码
  if (shell.exec('git pull').code !== 0) {
    console.log('[fail][4] 拉取代码失败'.red);
    return false;
  }

  // 5. 安装依赖
  if (shell.exec('npm i').code !== 0) {
    console.log('[fail][5] 安装依赖失败'.red);
    return false;
  }

  // 6. 设置权限
  shell.chmod(755, '-R', '.');

  // 7. 提示：完成
  console.log(`=======>>>> [webhooks] ${repository.name}: success <<<<=======`.green);
}
