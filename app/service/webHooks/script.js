const fs = require('fs');
const path = require('path');
const colors = require('colors');
const shell = require('shelljs');

// 处理函数
const handler = ({ body, header, sh}) => new Promise((resolve, reject) => {
  const { repository, ref } = body;
  console.log(`=======>>>> [webhooks] ${repository.name}: push new code!`);
  if (ref !== 'refs/heads/master'){
    console.log(`=======>>>> [webhooks] ${repository.name}: not master!`);
    reject('not master');
  }
  if (shell.exec(sh).code !== 0) {
    console.log(`=======>>>> [webhooks] ${repository.name}: update fail!`);
    reject('update fail');
  } else {
    console.log(`=======>>>> [webhooks] ${repository.name}: update success!`);
    resolve('update success');
  }
});


module.exports['blog-service'] = async ({ body, header }) => {
  handler({
    body,
    header,
    sh: `
      git checkout . && \
      git clean -xdf && \
      git pull && \
      npm i && \
      chmod 777 . -R
    `,
  });
}

module.exports['blog-client'] = async ({ body, header }) => {
  handler({
    body,
    header,
    sh: `
      cd html && \
      git checkout . && \
      git pull && \
      npm i && \
      npm run build && \
      chmod 777 . -R
    `,
  });
}
