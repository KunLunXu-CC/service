const fs = require('fs');
const path = require('path');
const { hash } = require('../../../utils/encryption');

module.exports = async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook --------\n\n\n\n\n\n', ctx.request.body, typeof ctx.request.body);
  fs.writeFileSync(
    path.resolve(__dirname, './webHookLogs.json'),
    `${JSON.stringify(ctx.request.body, null, 2)}\n\n
    ${JSON.stringify(ctx.request.header, null, 2)}\n\n
    ${hash({data: "e4312b06110aad6ebc9a4ffab08b97187477574e", type: "sha1"})}`,
    'utf-8'
  );
  console.log('---->>> ok \n\n\n\n\n\n\n');
  ctx.body = '成功';
}
