const path = require('path');
const shell = require('shelljs');

module.exports = async ({ body, header }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){
    console.log('[webhooks] 提交非 master 分支代码');
    return false;
  }

  // 1. 提示: 脚本开始
  console.log(`=======>>>> [webhooks] ${repository.name}: submit new code <<<<=======`)

  // 2. 进入项目目录
  shell.cd(path.resolve(__dirname, '../../../docker/nginx/html'));
  console.log('1. [success] 进入项目目录', shell.pwd());

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

  // 5. 安装依赖
  if (shell.exec(`rm -rf ./node_modules ./package-lock.json && npm run install:pro`).code !== 0) {
    console.log('4. [fail] 安装依赖失败');
    return false;
  }
  console.log('4. [success] 安装依赖成功');

  // 延时 10 分钟打包项目: 等待依赖安装完成
  console.log('5. [success] 1000 * 60 * 10 毫秒后将进行重新编译打包!');
  setTimeout(() => {
    // 6. 打包编译
    if (shell.exec('npm run build:pro').code !== 0) {
      console.log('5. [fail] 打包编译失败');
      return false;
    }
    console.log('5. [success] 打包编译成功');

    // 7. 设置权限
    shell.chmod('-R', 777, '.');
    console.log('6. [success] 设置权限成功');

    // 8. 提示：完成
    console.log(`=======>>>> [webhooks] ${repository.name}: success new code <<<<=======`)
  }, 1000 * 60 * 10);
}
