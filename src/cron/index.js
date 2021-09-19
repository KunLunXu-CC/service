// 定时任务：和业务系统分离是个独立的模块, 在 pm2 中被调用
const _ = require('lodash');
const path = require('path');
const { CronJob } = require('cron');
const { requireFiles } = require('../utils');

// 获取当前目录下所有定时任务(加载所有 index.cron.js 文件)
const getCrons = (crons = []) => {
  // 1. 加载所有脚本配置: [{ cronTime, onTick, onComplete}]
  requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: (file) => (path.basename(file) !== 'index.cron.js'),
    handler: (dest) => {
      crons.push(require(dest));
    },
  });
  return crons;
};

/**
 * 创建定时任务, 定时任务配置:
 * 1. cronTime 时间模式, 和 linux 下定时任务一样
 * 2. onComplete 当通过停止作业时将触发的函数(没有则设置为 null)
 * 3. onTick 定时任务
 */
_.values(getCrons()).map((setting) => new CronJob(
  setting.cronTime,
  setting.onTick,
  setting.onComplete,
  true,
  'Asia/Shanghai',
));
