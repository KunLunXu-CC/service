const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');

// 输入提示:
const echo = (value) => {
  shell.exec(`echo ${colors.yellow(value)}`);
};

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body;
  echo(`${repository.name}: 提交新代码！`);
  if (ref !== 'refs/heads/master'){return echo(`${repository.name}: 非 master 分支！`)}
  if (shell.exec('git pull && npm i').code !== 0) {
    return echo(`${repository.name}: 更新完成！`);
  }
  return echo(`${repository.name}: 更新失败！`);
}

module.exports.blog_client = async ({ body, header }) => {
  const { repository, ref } = body;
  echo(`${repository.name}: 提交新代码`);
  if (ref !== 'refs/heads/master'){ return echo(`${repository.name}: 非 master 分支！`)}
  if (shell.exec('cd html && git pull && npm i && npm run build').code !== 0) {
    return echo(`${repository.name}: 更新完成！`);
  }
  return echo(`${repository.name}: 更新失败！`);
}
