const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body;
  console.log('-----------------\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
  shell.exec('ls -a ../../../../blog_client');
  if (ref !== 'refs/heads/master'){return `${repository.name} push 非 master 分支`;}
  if (shell.exec('git pull && npm i').code !== 0) {return `${repository.name}更新完成`;}
  return `${repository.name}操作成功!`;
}
