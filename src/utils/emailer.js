const nodemailer = require('nodemailer');
const logger = require('./logger');
const { smtp } = require('#config/consts');

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
 *   attachments: [{ filename: 'emailer', path: path.resolve(import.meta.url, './emailer') }]
 * }).catch();
 */
module.exports = async (message) => {
  // 1. 获取配置信息
  const { notice, ...rest } = smtp;

  // 2. 创建连接池
  const transporter = nodemailer.createTransport(rest);

  // 3. 邮箱发送内容配置
  const options = {
    ...message,
    from: rest.auth.user,
    to: message.to || notice,
  };

  // 4. 打印日志
  logger.info({ options, label: '发送邮件' });

  // 5. 发送邮件
  return await transporter.sendMail(options);
};
