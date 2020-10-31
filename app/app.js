const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const https = require('https');
const moment = require('moment');
const router = require('./route');
const graphql = require('./graphql');
const createWebSockets = require('./ws');
const config = require('../config/system');
const middleware = require('./middleware');
const bindContext = require('./bindContext');
const { printStartCharPattern } = require('../utils/charPattern');
moment.locale('zh-cn'); // 设置 moment 地区

const app = new Koa();

bindContext(app);  // 绑定 context: db.mongo、ws
middleware(app);   // 中间件
router(app);       // 路由
graphql(app);      // graphql 服务

// 创建服务
const server = config.https
  ? https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.pem')),
    },
    app.callback()
  ).listen(config.port, printStartCharPattern)
  : app.listen(config.port, printStartCharPattern);

// 创建 WebSocket 服务(多个、根据路由进行分发)
createWebSockets(server);
