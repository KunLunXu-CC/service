const fs = require('fs');
const path = require('path');
//
module.exports = async () => {
  fs.writeFileSync(
    path.resolve(__dirname, './webHookLogs.json'),
    `${JSON.stringify(ctx.request.body, null, 2)}\n\n
    ${JSON.stringify(ctx.request.header, null, 2)}\n\n
    ${result}`,
    'utf-8'
  );
};
