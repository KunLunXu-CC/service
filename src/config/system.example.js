// 配置文件模板
import fs from 'fs';

let publicKey = ''; // 公钥
let privateKey = ''; // 私钥

// 读取秘钥
try {
  publicKey = fs.readFileSync(
    new URL('./public.key', import.meta.url),
    'utf-8',
  );

  privateKey = fs.readFileSync(
    new URL('./private.key', import.meta.url),
    'utf-8',
  );
} catch (message) {
  console.error('获取秘钥失败!');
}

export default {
  port: 4000,                      // 系统应用端口
  https: false,                    // 是否开启 https

  publicKey,                       // 公钥
  privateKey,                      // 私钥

  wsPort: 4001,                    // ws 端口

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
  webHookSecret: null,              // web hooks secret

  // SMTP 邮件服务配置
  smtp: {
    host: null,                      // 邮件服务地址
    secure: true,                    // 是否使用 TLS / STARTTLS 的安全电子邮件传递, 将使用 465 端口
    auth: {
      user: null,                    // 用户
      pass: null,                    // 授权密码
    },
    notice: null,                    // 收件人(站内消息通知)
  },

  // 企业微信
  weixin: {
    robot: {                         // 机器人
      logger: null,                  // 日志推送
    },
  },

  // 阿里云对象存储: https://oss.console.aliyun.com/overview
  oss: {
    // Bucket 所在地域
    region: null,

    // RAM 用户配置: https://help.aliyun.com/product/28625.html
    accessKeyId: null,
    accessKeySecret: null,

    // Bucket 名称
    bucket: null,
  },

  // tinify 图片压缩配置
  tinifyApiKey: null,

  // openai
  openaiApiKey: null, // openai Api key

  // 第三方登录
  oauth: {
    github: {
      clientID: null,     // 登记应用 ID
      clientSecret: null, // 登记应用 秘钥
    },
  },
};
