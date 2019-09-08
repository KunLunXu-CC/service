/* 系统配置 */
const setting = {
  /**** 开发阶段环境配置 ****/
  development: {
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
  },

  /**** 生产 ****/
  production: {
    port: 4000,                       // 系统应用端口
    graphql: {                        // graphql 配置
      path: '/specialUrl',            // graphql 应用路由
    },
    mongo: {                          // mongo 配置
      debug: false,                   // 是否启用 debug
      port: 27017,                    // 端口号
      host: 'mongo',                  // 主机
      database: 'blog',               // 数据库名
    },
    defaultUser: 'tourist',           // 默认用户(游客)账号
    webHookSecret: '123456',          // web-hooks 秘钥
  }
}
module.exports = setting[(process.env.NODE_ENV || 'development')];
