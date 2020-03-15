const fs = require('fs');
const path = require('path');

// 加载秘钥
const getSecretKey = (type) => {
  try {
    return fs.readFileSync(
      path.resolve(__dirname, `./${type}.key`),
      'utf-8'
    );
  } catch (e) {}
  return '';
}

module.exports = {
  https: false,                          // 是否开启 https
  publicKey: getSecretKey('public'),     // 公钥
  privateKey: getSecretKey('private'),   // 私钥

  port: 4000,                       // 系统应用端口

  corsOrigin: '*',                 // 跨域, 设置 Access-Control-Allow-Origin, https://www.qianyin925.com

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

  // 七牛云对象存储配置
  qiniu: {
    bucket: '************',                                   // 存储空间
    zone: '*******',                                          // 存储区域(华南)
    accessKey: '****************************************',    // AK
    secretKey: '****************************************',    // SK
    cdn: '************************************',              // cdn
  },

  // tinify 图片压缩配置
  tinify: {
    apiKey: '****************************',
  },

  // SMTP 邮件服务配置
  smtp: {
    host: "************",           // 邮件服务地址
    secure: true,                   // 是否使用 TLS / STARTTLS的安全电子邮件传递, 将使用 465 端口
    auth: {
      user: '*******************',  // 用户
      pass: '****************',     // 授权密码
    },
    notice: '*****************',    // 收件人(站内消息通知)
  },
};
