const nodemailer = require('nodemailer');
const { smtp } = require('../config/system');

/**
 * 邮箱发送
 * @param {String} message.to            (默认发送至站内通知人)收件人列表, 多个收件人用 , 分割
 * @param {String} message.subject       邮件主题
 * @param {String} message.html          邮件内容(html)
 * @param {String} message.text          邮件内容(文本), 如果设置了  html 则不显示该内容
 * @param {Object[]} message.attachments 附件列表 [{filename: '附件名(可选)', path: '文件本地路径'}...] 更多配置参考： https://nodemailer.com/message/attachments/
 * @example
 * await emailer({
 *   // to: 'xxx.@qq.com',
 *   subject: '邮箱主题',
 *   html: '<div>邮箱 html</div>',
 *   text: '邮箱内容',
 *   attachments: [{ filename: 'emailer.js', path: path.resolve(__dirname, './emailer.js') }]
 * }).catch();
 */
module.exports = async (message) => {
  // 1. 获取配置信息
  const { notice, ...options } = smtp;
  // 2. 如果收件人列表未设置则默认发送到指定邮箱(站内消息通知邮箱)
  !message.to && (message.to = notice);
  // 3. 创建连接池
  let transporter = nodemailer.createTransport(options);
  // 4. 发送邮箱
  return await transporter.sendMail({
    ...message,
    from: options.auth.user,
  });
}
