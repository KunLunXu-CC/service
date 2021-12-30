// 字符图案
import logger from './logger.js';
import config from '#config/system';

// 在服务运行完毕打印字符图案
export const printStartCharPattern = async () => {
  const pattern = [
    '',
    '           ▍ ★∴',
    '　s ．t ．▍▍a．..r．█▍ ☆ ★∵t ..../ ',
    '　　◥█▅▅██▅▅██▅▅▅▅▅███◤ ',
    ' 　 ．◥███████████████◤',
    '～～～～◥█████████████◤～～～～',
    '～～～～～～～～～～～～～～～～～～～～～～～～',
    `当前服务：localhost:${config.port}`,
    `graphql 服务：localhost:${config.port}${config.graphql.path}`,
  ];
  logger.info(pattern.join('\n'));
};

export const space = {};
