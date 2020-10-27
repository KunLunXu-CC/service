/**
 * 备份定时任务
 */
const ora = require('ora');
const shell = require('shelljs');
const moment = require('moment');
const doBackup = require('./doBackup');
const emailer = require('../../utils/emailer');
const logger = require('../../utils/logger');

// 获取 html
const getHtml = () => {
  const html = `
    <div>
      <h2>个人网站数据备份</h2>
      <h3>备份内容如下:</h3>
      <p style="text-indent: 2em;">
      1. 生产环境配置文件: production.js
      </p>
      <p style="text-indent: 2em;">
      2. SSL 证书: ssl.pem ssl.key
      </p>
      <p style="text-indent: 2em;">
      3. 数据库备份: mongo.blog
      </p>
      <p style="text-indent: 2em;">
      4. 服务端静态资源备份: app/static
      </p>
      <p style="font-size:12px;text-align: right;">
        当前时间: ${moment().format('YYYY-MM-DD hh:mm:ss')}
      </p>
    </div>
  `;
  return html;
}

// 定时任务执行函数
const onTick = async () => {
  let res = true;
  const backupPath = doBackup();

  // 发送邮件
  await emailer({
    html: getHtml(),                       // 邮件内容(html)
    subject: `个人网站数据备份`,            // 邮件主题
    attachments: [{ path: backupPath }], // 附件
  }).catch(err => {
    res = false;
    ora().fail('个人网站数据备份失败!');
    logger.info(err)
  });
  res && ora().succeed('个人网站数据备份成功!');

  // 删除备份文件
  shell.rm('-rf', backupPath);
}

module.exports = {
  onTick,                      // 在指定时间执行该函数
  onComplete: null,            // 当通过停止作业时将触发的函数
  cronTime: "0 30 3 * * *",    // 时间模式(每天早上 3 点 30 分： 0 30 3 * * *)
};
