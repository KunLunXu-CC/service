import log4js from 'log4js';

const LAYOUT_CONSOLE = {
  type: 'pattern',
  pattern: '%[[%p] %d{yyyy/MM/dd-hh.mm.ss}%] at %x{callStack} %n%n  %m %n%n',
  tokens: {
    callStack: (event) => `${event.fileName} ${event.lineNumber}:${event.columnNumber}`,
  },
};

log4js.configure({
  // 1. 输出源: 用于定义日志是如何输出的, see: https://log4js-node.github.io/log4js-node/appenders.html
  appenders: {
    console: {
      type: 'stdout',
      layout: LAYOUT_CONSOLE, // 日志内容格式
    },
    multiWithLevel: {
      base: 'logs/',  // 日志文件存储路径 + 文件名前缀
      type: 'multiFile', // 多文件
      property: 'level', // 日志按照 logEvent.level 拆分
      extension: '.log', // 日志文件的后缀名
      backups: 3, // 备份数量
      compress: true, // 备份文件是否压缩存储
      maxLogSize: 20 * 1024 * 1024, // 每个日志文件最大 20 M
      layout: {
        ...LAYOUT_CONSOLE,
        pattern: LAYOUT_CONSOLE.pattern.replace(/(%\[|%\])/g, ''), // 去除着色的配置 %[ %]
      },
    },
    multiWithUser: {
      base: 'logs/user/',  // 日志文件存储路径 + 文件名前缀
      type: 'multiFile', // 多文件
      property: 'userId', // 日志按照 logEvent.context.userId 拆分
      extension: '.log', // 日志文件的后缀名
      backups: 3, // 备份数量
      compress: true, // 备份文件是否压缩存储
      maxLogSize: 20 * 1024 * 1024, // 每个日志文件最大 20 M
      layout: {
        ...LAYOUT_CONSOLE,
        pattern: LAYOUT_CONSOLE.pattern.replace(/(%\[|%\])/g, ''), // 去除着色的配置 %[ %]
      },
    },
    useMultiWithUser: {
      level: 'warn', // 允许通过过滤器的最低事件级别
      type: 'logLevelFilter', // 使用日志级别过滤器
      appender: 'multiWithUser', // 转移给 multiWithUser 处理
    },
  },

  // 2. 类别: 用于定义日志的类别, see: https://log4js-node.github.io/log4js-node/categories.html
  categories: {
    default: {
      level: 'all',
      appenders: ['console',  'multiWithLevel', 'useMultiWithUser'],
      enableCallStack: true,
    },
  },
});

// 3. 获取 Logger 实例
const logger = log4js.getLogger();

// 4. 添加上下文: 用户 ID
logger.addContext('userId', '21321312421231');

// 5. 输出日志
logger.debug('这是一个 debug:', '会不会被输出');
logger.warn('这一个 warn:', '会不会被输出');
logger.error('这一个 error:', '会不会被输出');
