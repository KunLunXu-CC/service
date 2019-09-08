const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body;
  console.log('==================>>>>\n\n\n\n\n\n\n', repository, ref);
  if (ref !== 'refs/heads/master'){return `${repository.name}push 非 master 分支`;}
  if (shell.exec('git pull').code !== 0) {
    return `${repository.name}代码拉取失败`;
  }
  shell.cd('../../../');
  shell.rm('-rf', 'node_modules');
  shell.rm('-rf', 'package-lock.json');
  shell.exec('npm i');
  return `${repository.name}操作成功!`;
}
