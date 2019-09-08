const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body; 
  if (ref !== 'refs/heads/master'){return `${repository.name}push 非 master 分支`;}
  if (shell.exec('git pull').code !== 0) {
    return `${repository.name}代码拉取失败`;
  }
  return `${repository.name}操作成功!`;
}
