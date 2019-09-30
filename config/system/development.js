const fs = require('fs');
const path = require('path');
module.exports = {
  port: 4000,                       // 系统应用端口

  graphql: {                        // graphql 配置
    path: '/graphql',               // graphql 应用路由
  },

  mongo: {                          // mongo 配置
    debug: true,                    // 是否启用 debug
    port: 27017,                    // 端口号
    host: '127.0.0.1',              // 主机
    database: 'blog',               // 数据库名
  },

  defaultUser: 'tourist',           // 默认用户(游客)账号
  webHookSecret: '******',          // web hooks secret

  // 登录私钥
  privateKey: fs.readFileSync(path.resolve(__dirname, './private.dev.key')),
  // 登录公钥
  publicKey: fs.readFileSync(path.resolve(__dirname, './public.dev.key')),

  // 七牛云对象存储配置
  qiniu: {
    bucket: 'qianyin-blog',                                   // 存储空间
    zone: 'Zone_z2',                                          // 存储区域(华南)
    accessKey: '********************12XjpJbAgdp7ovVdEa5p',    // AK
    secretKey: '********************Cf4csPekcOmYuw4BMF3_',    // SK
    cdn: 'http://qiniu.cdn.blog.qianyin925.com',              // cdn
  },

  // SMTP 邮件服务配置
  smtp: {
    host: "smtp.***.com",           // 邮件服务地址
    secure: true,                   // 是否使用 TLS / STARTTLS的安全电子邮件传递, 将使用 465 端口
    auth: {
      user: '***********@***.com',  // 用户
      pass: '****************',     // 授权密码
    },
    notice: '*********@qq.com',     // 收件人(站内消息通知)
  },
};
