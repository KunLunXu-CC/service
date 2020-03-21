const { printStartCharPattern } = require('../utils/charPattern');
const middleware = require('./middleware');
const config = require('../config/system');
const graphql = require('./graphql');
const moment = require('moment');
const router = require('./route');
const https = require('https');
const path = require('path');
const Koa = require('koa');
const db = require('./db');
const fs = require('fs');
const app = new Koa();

// 设置 moment 地区
moment.locale('zh-cn');

db(app);
middleware(app);
router(app);
graphql(app);

if (!config.https) {
  app.listen(config.port, printStartCharPattern);
} else {
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.pem')),
  };
  https.createServer(options, app.callback()).listen(config.port, printStartCharPattern);
}
