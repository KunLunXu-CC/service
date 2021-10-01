// 字符图案
import logger from './logger.mjs';
import getConfig from '../config/system/index.mjs';

// 在服务运行完毕打印字符图案
export const printStartCharPattern = async () => {
  const config = await getConfig();

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
