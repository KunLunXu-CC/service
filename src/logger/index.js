import log4js from 'log4js';


log4js.configure({
  // 1. 输出源: 用于定义日志是如何输出的, see: https://log4js-node.github.io/log4js-node/appenders.html
  appenders: {
    print: {
      type: 'stdout',
      // layout: 输出格式 see: https://log4js-node.github.io/log4js-node/layouts.html
      layout: {
        type: 'pattern',
        pattern: '%[[%p] %d{yyyy/MM/dd-hh.mm.ss}%] at %x{callStack} %[%] %n %m %n%n',
        tokens: {
          callStack: (event) => `${event.fileName} ${event.lineNumber}:${event.columnNumber}`,
          // location
        },
      },

    },
  },

  // 2. 类别: 用于定义日志的类别, see: https://log4js-node.github.io/log4js-node/categories.html
  categories: {
    default: {
      level: 'all',
      appenders: ['print'],
      enableCallStack: true,
    },
  },
});

// 3. 获取 Logger 实例
const logger = log4js.getLogger();

// 4. 输出日志
logger.debug('这是一个 debug:', '会不会被输出');
logger.warn('这一个 warn:', '会不会被输出');
logger.error('这一个 error:', '会不会被输出');
