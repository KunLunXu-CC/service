const { printStartCharPattern } = require('../utils/charPattern');
const webSocket = require('./service/webSocket');
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

// 设置 moment 地区
moment.locale('zh-cn');

bindContext(app);
middleware(app);
router(app);
graphql(app);

const server = config.https
 ? https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.pem')),
  }, app.callback()).listen(config.port, printStartCharPattern)
 : app.listen(config.port, printStartCharPattern);

 webSocket(server, app);
