import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import winston from 'winston';
import systemConfig from '#config/system';
import getCallInfo from './getCallInfo.js';
import DailyRotateFile from 'winston-daily-rotate-file';

// JSON.stringify 处理
const replacerJson = (key, value) => {
  if (!(value instanceof Error)) {
    return value;
  }

  return Object.getOwnPropertyNames(value).reduce((total, propName) => ({
    ...total,
    [propName]: value[propName],
  }), {});
};

const formatMessageToStr = ({ level, message }) => {
  const { time, callInfo, label } = message;
  const info = message[level];

  let formatMessage = info;

  // 根据数据类型, 格式内容
  switch (Object.prototype.toString.call(info)) {
    case '[object Array]':
      formatMessage = info.reduce((total, ele) => {
        let current = ele;

        try {
          current = _.isString(current)
            ? current
            : JSON.stringify(ele, replacerJson, 2);
        } catch (e) {
          console.log(`[logger] 日志格式化字符串失败: ${JSON.stringify(e, replacerJson, 2)}`, ele);
        }

        return `${total}\n${current}`;
      }, '');
      break;
    case '[object Object]':
      formatMessage = JSON.stringify(info, replacerJson, 2);
      break;
  }

  return [
    '=============================================================>>>',
    `>> 标签: ${label}`,
    `>> 级别: ${level}`,
    `>> 时间: ${time}`,
    `>> 位置: ${callInfo.fileName}: ${callInfo.lineNumber}`,
    `>> 内容: \n${formatMessage}`,
    '<<<=============================================================',
  ].join('\n');
};

// 文本输出格式化
const printString = winston.format.printf(formatMessageToStr);

const logger = winston.createLogger({
  // 1. 日志输出: 可将日志输出到多个途径
  transports: [
    // TODO: 数据库存储, 自定义 transport 并对日志进行存储

    // 1. WebSocket 输出: 通过 WebSocket 广播日志, 实现客户端日志实时查看
    new class extends winston.Transport {
      log (info, callback) {
        //  console.log('%c [ info, callback ]-11', 'font-size:13px; background:pink; color:#bf2c9f;', info);
        callback();
      }
    },

    // 2. 以日志文件形式存储
    new DailyRotateFile({
      maxFiles: '7d',                 // 日志数量限制, 只保存 7 天内的日志(最多: 7 * 24)
      maxSize: '20m',                 // 文件大小限制
      format: printString,            // 打印文本内容格式化
      datePattern: 'YYYY-MM-DD-HH',   // 日志文件划分, 按小时进行划分日志
      auditFile: new URL('./logs/auditFile.json', import.meta.url).pathname, // 审计文件目录、文件名
      filename: new URL('./logs/%DATE%.log', import.meta.url).pathname, // 输入日志目录、文件名
    }),

    // 3. 控制台日志输出
    new winston.transports.Console({ format: printString }),
  ],
});

/**
 * 调用 winston 实例 logger 方法来输出日志
 * 不同方法对应不同日志级别, 所有方法以及对应日志级别有: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 *
 * @param {object} params 参数
 * @param {string}  params.label 日志标记(标题)
 * @param {string | string[] | object} [params.message] 日志信息
 * @param {'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'}  [params.level=info] 日志级别
 * @example logger({ label: '删除成功!', message: '测试数据'  })
 */
export default async ({ level = 'info', label, message }) => {
  try {
    const payload = {
      level,
      message: {
        label,
        [level]: message,
        callInfo: getCallInfo(), // 调用函数, 相关信息
        time: `${moment().format('YYYY-MM-DD hh:mm:ss')}`,
      },
    };
    logger.log(payload);

    // 机器人消息通知, 获取机器人 webhooks
    const robotWithLogger = systemConfig?.weixin?.robot?.logger;

    if (['error', 'warn'].includes(level) && robotWithLogger) {
      axios({
        method: 'POST',
        url: robotWithLogger,
        data: {
          msgtype: 'markdown',
          markdown: {
            content: `
              # Logger - ${level}
              > 时间: ${moment().format('YYYY-MM-DD hh:mm:ss')}
              > 日志内容: ${formatMessageToStr(payload)}
            `,
          },

        },
      });
    }
  } catch (err) {
    console.log('日志处理错误', err);
  }
};
