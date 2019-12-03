// 定时任务
const _ = require('lodash');
const path = require('path');
const CronJob = require('cron').CronJob;
const { requireFiles } = require('../../utils');

module.exports = app => {
  const crons = requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: [path.resolve(__dirname, './index.js')],
  });
  _.values(crons).forEach(cron => {
    _.isFunction()
      ? cron(app)
      : new CronJob(
        cron.cronTime,
        cron.onTick,
        cron.onComplete,
        true,
        'Asia/Shanghai'
      );
  });
}
