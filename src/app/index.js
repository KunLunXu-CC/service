import fs from 'fs';
import Koa from 'koa';
import https from 'https';
import mongo from '#mongo';
import moment from 'moment';
import graphql from '#graphql';
import router from '#app/router';
import config from '#config/system';
import middleware from '#middleware';
import { printStartCharPattern } from '#utils/charPattern';

moment.locale('zh-cn'); // 设置 moment 地区

const app = new Koa();

await mongo();      // 连接 mongo
middleware(app);    // 中间件
router(app);        // 路由
await graphql(app); // graphql 服务

// 创建服务
config.https
  ? https.createServer(
    {
      key: fs.readFileSync(new URL('../../docker/nginx/ssl.key', import.meta.url)),
      cert: fs.readFileSync(new URL('../../docker/nginx/ssl.pem', import.meta.url)),
    },
    app.callback(),
  ).listen(config.port, printStartCharPattern)
  : app.listen(config.port, printStartCharPattern);
