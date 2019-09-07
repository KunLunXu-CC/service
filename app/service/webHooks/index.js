const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = async (ctx, next) => {
  console.log('\n\n\n\n\n------ web hook ------\n\n\n\n\n\n', ctx.request.body.toString(), '\n\n\n\n');
  fs.writeFileSync(
    path.resolve(__dirname, './webHookLogs.json'),
    `${JSON.stringify(ctx.request.body, null, 2)}\n\n
    ${JSON.stringify(ctx.request.header, null, 2)}\n\n
    ${crypto.createHmac('sha1', 'qianyin').update(ctx.request.body.toString()).digest('hex')}`,
    'utf-8'
  );
  console.log('---->>> ok \n\n\n\n\n\n\n');
  ctx.body = '成功';
}

// const secret = "your_secret_here";
// const repo = "~/your_repo_path_here/";
// ​
// const http = require('http');
// const crypto = require('crypto');
// const exec = require('child_process').exec;
// ​
// http.createServer(function (req, res) {
//     req.on('data', function(chunk) {
//         let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
// ​
//         if (req.headers['x-hub-signature'] == sig) {
//             exec('cd ' + repo + ' && git pull');
//         }
//     });
// ​
//     res.end();
// }).listen(8080);
