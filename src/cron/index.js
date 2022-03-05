// 定时任务：和业务系统分离是个独立的模块, 在 pm2 中被调用
import logger from '#logger';
import { CronJob } from 'cron';
import { importFiles } from '#utils/fs';

// 1. 读取所有定时定时任务配置
const crons = await importFiles({
  dir: new URL('.', import.meta.url),
  filter: (file) => !/index\.js$/.test(file), // 过滤 index.js
});

/**
 * 2. 创建定时任务, 定时任务配置:
 * 1. cronTime 时间模式, 和 linux 下定时任务一样
 * 2. onComplete 当通过停止作业时将触发的函数(没有则设置为 null)
 * 3. onTick 定时任务
 */
crons.map(({ value: setting }) => setting?.cronTime && new CronJob(
  setting.cronTime,
  setting.onTick,
  setting.onComplete,
  true,
  'Asia/Shanghai',
));

// 3. 日志打印
logger.info(`启动定时任务: ${JSON.stringify(crons, null, 2)}`);
