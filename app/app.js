const { printStartCharPattern } = require('../utils/charPattern');
const bindContext = require('./bindContext');
const middleware = require('./middleware');
const config = require('../config/system');
const graphql = require('./graphql');
const moment = require('moment');
const router = require('./route');
const https = require('https');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

moment.locale('zh-cn'); // 设置 moment 地区

bindContext(app);  // 绑定 context: db.mongo、ws
middleware(app);
router(app);
graphql(app);

// 创建服务
if (config.https) {
  https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.pem')),
    },
    app.callback()
  ).listen(config.port, printStartCharPattern)
} else {
  app.listen(config.port, printStartCharPattern);
}
