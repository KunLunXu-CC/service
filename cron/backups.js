/**
 * 备份定时任务
 */
const path = require('path');
const moment = require('moment');
const emailer = require('../utils/emailer');
const { readFileList } = require('../utils');

// 获取附件列表
const getAttachments = () => {
  const attachments = [{
    filename: 'production.js',
    path: path.resolve(__dirname, '../config/system/production.js')
  }];

  const mongoBackups = readFileList(
    path.resolve(__dirname, '../docker/store/mongo/backups/')
  ).sort((a, b) => b.localeCompare(a))[0];

  mongoBackups && attachments.push({
    filename: mongoBackups.split('/').reverse()[0],
    path: mongoBackups,
  });
  return attachments;
}

// 获取 html: 参数附件列表
const getHtml = (attachments) => {
  const html = `
    <div>
      <p>当前时间: ${moment().format('YYYY-MM-DD hh:mm:ss')}</p>
      <p>拷贝文件列表:</p>
      ${attachments.map((v, index) => (
        `<p style="text-indent: 2em;">${index + 1}. ${v.filename}</p>`
      )).join('')}
    </div>
  `;
  return html;
}

// 获取 subject
const getSubject = () => {
  return `qianyin925 数据拷贝(${moment().format('YYYY-MM-DD')})`;
}

const onTick = async () => {
  let res = true;

  const attachments = getAttachments();
  const html = getHtml(attachments);
  const subject = getSubject();
  await emailer({ html, attachments, subject }).catch(err => {
    res = false;
    console.log('邮件发送失败:', err);
  });
  res && console.log('邮件发送成功!');
}

module.exports = {
  onTick,                      // 在指定时间执行该函数
  onComplete: null,            // 当通过停止作业时将触发的函数
  cronTime: "0 30 3 * * *",    // 时间模式(每天早上 3 点 30 分： 0 30 3 * * *)
};
