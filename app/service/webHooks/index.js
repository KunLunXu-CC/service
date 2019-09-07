const fs = require('fs');
const path = require('path');
const { hmac } = require('../../../utils/encryption');

module.exports = async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook ------\n\n\n\n\n\n', ctx.request.body.read);
  fs.writeFileSync(
    path.resolve(__dirname, './webHookLogs.json'),
    `${JSON.stringify(ctx.request.body, null, 2)}\n\n
    ${JSON.stringify(ctx.request.header, null, 2)}\n\n
    ${hmac({data: "web-hooks", secret: "qianyin"})}`,
    'utf-8'
  );
  console.log('---->>> ok \n\n\n\n\n\n\n');
  ctx.body = '成功';
}
