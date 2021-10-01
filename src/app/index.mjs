import fs from 'fs';
import Koa from 'koa';
import https from 'https';
import moment from 'moment';
import router from './router.mjs';
import mongo from '../mongo/index.mjs';
import graphql from './graphql/index.mjs';
import createWebSockets from './ws/index.mjs';
import getConfig from '../config/system/index.mjs';
import middleware from './middleware/index.mjs';
import { printStartCharPattern } from '../utils/charPattern.mjs';

moment.locale('zh-cn'); // 设置 moment 地区

const app = new Koa();

await mongo();      // 连接 mongo
middleware(app);    // 中间件
router(app);        // 路由
await graphql(app); // graphql 服务


const config = await getConfig(); // 读取配置

// 创建服务
const server = config.https
  ? https.createServer(
    {
      key: fs.readFileSync(new URL('../docker/nginx/ssl.key', import.meta.url)),
      cert: fs.readFileSync(new URL('../docker/nginx/ssl.pem', import.meta.url)),
    },
    app.callback(),
  ).listen(config.port, printStartCharPattern)
  : app.listen(config.port, printStartCharPattern);

// 创建 WebSocket 服务(多个、根据路由进行分发)
createWebSockets(server);
