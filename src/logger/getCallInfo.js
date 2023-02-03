
import _ from 'lodash';

// 调用信息: 日志打印位置
export default () => {
  const orig = Error.prepareStackTrace; // 暂存
  Error.prepareStackTrace = (_, stack) => stack; // 篡改
  const { stack } = new Error;
  Error.prepareStackTrace = orig; // 恢复
  // getPosition getFunction  getFunctionName getFileName getLineNumber
  const currentStack = _.last(stack.filter((v) => /^file/.test(v?.getFileName())));
  return {
    fileName: currentStack?.getFileName(),
    lineNumber: currentStack?.getLineNumber(),
  };
};
