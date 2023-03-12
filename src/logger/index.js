import log4js from 'log4js';

log4js.configure({
  // 输出源: 用于定义日志是如何输出的, see: https://log4js-node.github.io/log4js-node/appenders.html
  appenders: {
    print: { type: 'stdout' },
    robot: {
      type: {
        configure: () => (...rest) => {
          // console.log('%c [ are ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', are);
          console.log('%c [ rest ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', rest);
        },
      },
    },
  },

  // 类别: 用于定义日志的类别, see: https://log4js-node.github.io/log4js-node/categories.html
  categories: {
    default: {
      level: 'warn',
      appenders: ['print', 'robot'],
    },
  },
});

// 获取 Logger 实例
const logger = log4js.getLogger();

logger.debug('这是一个 debug');
logger.warn('这一个 warn');
logger.error('这一个 error', 1);
