// 定时任务：和业务系统分离是个独立的模块, 在 pm2 中被调用
const _ = require('lodash');
const path = require('path');
const CronJob = require('cron').CronJob;
const { requireFiles } = require('../utils');

// 获取当前目录下所有定时任务配置
const cronSettings= requireFiles({
  dir: path.resolve(__dirname, '.'),
  filter: [path.resolve(__dirname, './index.js')],
});

// 创建定时任务
const crons = _.values(cronSettings).map( setting => new CronJob(
  setting.cronTime,
  setting.onTick,
  setting.onComplete,
  true,
  'Asia/Shanghai'
));
