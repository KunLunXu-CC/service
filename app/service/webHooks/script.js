const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

module.exports.blog_service = async ({ body, header }) => {
  const { repository, ref } = body;
  if (ref !== 'refs/heads/master'){return `${repository.name} push 非 master 分支`;}
  if (shell.exec('git pull && npm i').code !== 0) {return `${repository.name}更新完成`;}
  return `${repository.name}操作成功!`;
}

module.exports.blog_client = async ({ body, header }) => {
  const { repository, ref } = body;
  if (shell.exec('cd html && ls && git pull && npm i && npm run build').code !== 0) {
    return `${repository.name}更新完成`;
  }
  return `${repository.name}操作成功!`;
}
