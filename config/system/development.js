const fs = require('fs');
const path = require('path');
module.exports = {
  port: 4000,                       // 系统应用端口
  graphql: {                        // graphql 配置
    path: '/specialUrl',            // graphql 应用路由
  },
  mongo: {                          // mongo 配置
    debug: true,                    // 是否启用 debug
    port: 27017,                    // 端口号
    host: '127.0.0.1',              // 主机
    database: 'blog',               // 数据库名
  },
  defaultUser: 'tourist',           // 默认用户(游客)账号
  webHookSecret: '123456',          // web-hooks 秘钥
  // 登录私钥
  privateKey: fs.readFileSync(path.resolve(__dirname, './private.dev.key')),
  // 登录公钥
  publicKey: fs.readFileSync(path.resolve(__dirname, './public.dev.key')),
};
