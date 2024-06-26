import axios from 'axios';
import moment from 'moment';
import log4js from 'log4js';
import systemConfig from '#config/system';

// 当前目录
const CURRENT_DIRECTORY = new URL('.', import.meta.url).pathname;

// 控制台输出格式
const LAYOUT_CONSOLE = {
  type: 'pattern',
  pattern: '%[[%p] %d{yyyy/MM/dd-hh.mm.ss}%] at %x{callStack} %n%n  %m %n%n',
  tokens: {
    callStack: (event) => `${event.fileName} ${event.lineNumber}:${event.columnNumber}`,
  },
};

// 多文件存储基本配置
const MULTI_FILE_BASE = {
  type: 'multiFile',               // 多文件
  extension: '.log',               // 日志文件的后缀名
  backups: 3,                      // 备份数量
  compress: true,                  // 备份文件是否压缩存储
  maxLogSize: 20 * 1024 * 1024,    // 每个日志文件最大 20 M
  layout: {                        // 输出日志格式
    ...LAYOUT_CONSOLE,             // 使用 「控制台输出格式」
    pattern: LAYOUT_CONSOLE.pattern.replace(/(%\[|%\])/g, ''), // 去除着色的配置 %[ %]
  },
};

// 自定义 appender: 使用「企微机器人」发送通知
const ROBOT = {
  configure: (config, layouts) => (event) => {
    // 1. 企微机器人 webhooks
    const robotWebhook = systemConfig?.weixin?.robot?.logger;

    // 2. 如果日志等级小于 warn 则不进行处理 || 企微机器人 webhooks 不存在
    if (!event.level.isGreaterThanOrEqualTo('warn') || !robotWebhook) {
      return false;
    }

    // 3. 调用 layouts 里 messagePassThroughLayout 方法获取到格式化后的「日志事件数据」
    const message = layouts.messagePassThroughLayout(event);

    // 4. 调用企微机器人 api, 推送消息
    axios({
      method: 'POST',
      url: robotWebhook,
      data: {
        msgtype: 'markdown',
        markdown: {
          content: [
            '## 昆仑虚日志监控',
            `> 级别: <font color="warning">${event.level}</font>`,
            `> 时间: <font color="info">${moment(event.startTime).format('YYYY-MM-DD HH:mm:ss')}</font>`,
            `> 调用栈: <font color="comment">${event.fileName} ${event.lineNumber}:${event.columnNumber}</font>`,
            '>',
            '>',
            `\`${message}\``,
          ].join('\n'),
        },
      },
    });
  },
};

// 设置配置项
log4js.configure({
  // 1. 输出源: 用于定义日志是如何输出的, see: https://log4js-node.github.io/log4js-node/appenders.html
  appenders: {
    // 企微机器人通知
    robot: { type: ROBOT },
    // 控制台日志输出
    console: {
      type: 'stdout',
      layout: LAYOUT_CONSOLE,
    },
    // 日志文件存储(按日志等级)
    multiWithLevel: {
      ...MULTI_FILE_BASE,
      property: 'level',
      base: `${CURRENT_DIRECTORY}logs/`,
    },
    // 日志文件存储(按用户)
    multiWithUser: {
      ...MULTI_FILE_BASE,
      property: 'userId',
      base: `${CURRENT_DIRECTORY}logs/user`,
    },
    // 使用「multiWithUser」
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
      appenders: [
        'robot',
        'console',
        'multiWithLevel',
        'useMultiWithUser',
      ],
      enableCallStack: true,
    },
  },
});

/**
 * 日志输出
 *
 * @param {object} params 参数
 * @param {object} params.ctx koa 上下文
 * @param {string} [params.label=''] 日志标记(标题)
 * @param {string} params.categoryName 日志类别
 * @param {string | string[] | object} [params.message] 日志信息
 * @param {'trace'|'debug'|'info'|'warn'|'error'|'fatal'|'mark'}  [params.level='info'] 日志级别
 * @example logger({ label: '删除数据', message: '删除成功'  })
 */
export default ({ ctx, categoryName, message, label = '', level = 'info' }) => {
  // 1. 无效日志处理
  if (!label && !message) {
    return;
  }

  // 2. 获取 Logger 实例
  const logger = log4js.getLogger(categoryName);

  // 3. 添加上下文: 用户 ID
  const userId = ctx?.state.user.id ?? '000000';
  logger.addContext('userId', userId);

  // 4. 输出日志
  logger[level](label ? `${label}:\n` : '', message);
};
