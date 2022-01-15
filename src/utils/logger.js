import moment from 'moment';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// 调用信息: 日志打印位置
const getCallInfo = function () {
  const orig = Error.prepareStackTrace; // 暂存
  Error.prepareStackTrace = (_, stack) => stack; // 篡改
  const { stack } = new Error;
  Error.prepareStackTrace = orig; // 恢复
  // getPosition getFunction  getFunctionName getFileName getLineNumber
  return {
    fileName: stack[10]?.getFileName(),
    lineNumber: stack[10]?.getLineNumber(),
  };
};

// 文本输出格式化
const printString = winston.format.printf(({
  time,
  level,
  message,
  fileName,
  lineNumber,
}) => {
  let formatMessage = message;

  // 根据数据类型, 格式内容
  switch (Object.prototype.toString.call(message)) {
  case '[object Array]':
    formatMessage = message.join('\n');
    break;
  case '[object Object]':
    formatMessage = JSON.stringify(message, null, 2);
    break;
  }

  return [
    '==============================================================================================',
    `>> 级别: ${level}`,
    `>> 时间: ${time}`,
    `>> 位置: ${fileName}: ${lineNumber}`,
    `>> 内容: \n${formatMessage}`,
    '==============================================================================================',
  ].join('\n');
});

/**
 * TODO: 数据库存储, 自定义 transport 并对日志进行存储
 * 调用 winston 实例 logger 方法来输出日志
 * 不同方法对应不同日志级别, 所有方法有: emerg alert crit error warning notice info debug
 * 如: logger.info 输出信息
 * 如: logger.error 输出错误信息
 * 待输出日志可以是对象(对象中建议使用 label 进行日志标记) 当然也可以是一个字符串
 */
export default winston.createLogger({
  // 1. 日志格式化配置: combine 可配置多个参数
  format: winston.format.combine(
    { // 注入自定义参数
      transform: (info) => ({
        ...info,
        ...getCallInfo(),
        time: `${moment().format('YYYY-MM-DD hh:mm:ss')}`,
      }),
    },
  ),

  // 2. 日志输出: 可将日志输出到多个途径
  transports: [
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
      auditFile: new URL('../../logs/auditFile.json', import.meta.url).pathname, // 审计文件目录、文件名
      filename: new URL('../../logs/%DATE%.log', import.meta.url).pathname, // 输入日志目录、文件名
    }),

    // 3. 控制台日志输出
    new winston.transports.Console({ format: printString }),
  ],
});