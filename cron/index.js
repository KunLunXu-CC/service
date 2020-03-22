// 定时任务：和业务系统分离是个独立的模块, 在 pm2 中被调用
const _ = require('lodash');
const path = require('path');
const CronJob = require('cron').CronJob;
const { requireFiles } = require('../utils');

// 获取当前目录下所有定时任务
const getCrons = (crons = []) => {
  // 1. 加载所有脚本配置: [{ cronTime, onTick, onComplete}]
  requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: file => (path.basename(file) !== 'index.cron.js'),
    handler: dest => {
      crons.push(require(dest));
    }
  });
  return crons;
}

// 创建定时任务
_.values(getCrons()).map( setting => new CronJob(
  setting.cronTime,
  setting.onTick,
  setting.onComplete,
  true,
  'Asia/Shanghai'
));
