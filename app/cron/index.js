// 定时任务
const _ = require('lodash');
const path = require('path');
const CronJob = require('cron').CronJob;
const { requireFiles } = require('../../utils');

module.exports = app => {

  // 获取当前目录下所有定时任务配置
  const crons = requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: [path.resolve(__dirname, './index.js')],
  });

  _.values(crons).forEach(cron => {
    cron && cron.onTick &&
    new CronJob(
      cron.cronTime,
      cron.onTick,
      cron.onComplete,
      true,
      'Asia/Shanghai'
    );
  });
}
