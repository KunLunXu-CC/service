const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){return `${repository.name}push 非 master 分支`;}
  console.log('1====================>>>>\n\n\n\n\n\n\n', repository, ref);
  if (shell.exec('git pull').code !== 0) {
    return `${repository.name}代码拉取失败`;
  }
  console.log('2==================>>>>\n\n\n\n\n\n\n', repository, ref);
  // shell.cd('../../../');
  // shell.rm('-rf', 'node_modules');
  // shell.rm('-rf', 'package-lock.json');
  // shell.exec('npm i');
  console.log('3==================>>>>\n\n\n\n\n\n\n', repository, ref);

  return `${repository.name}操作成功!`;
}
