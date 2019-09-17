const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');

// 处理函数
const handler = ({ body, header, sh}) => new Promise((resolve, reject) => {
  const { repository, ref } = body;
  console.log(colors.yellow(`${repository.name}: push new code!`));
  if (ref !== 'refs/heads/master'){
    console.log(colors.yellow(`${repository.name}: not master!`));
    reject('not master');
  }
  if (shell.exec(sh).code !== 0) {
    console.log(colors.yellow(`${repository.name}: update success!`));
    resolve('update success');
  }
  console.log(colors.yellow(`${repository.name}: update fail!`));
  reject('update fail!');
});


module.exports.blog_service = async ({ body, header }) => {
  handler({
    body, 
    header,
    sh: 'git pull && npm i',
  });
}

module.exports.blog_client = async ({ body, header }) => {
  handler({
    body, 
    header,
    sh: 'cd html && git pull && npm i && npm run build',
  });
}
