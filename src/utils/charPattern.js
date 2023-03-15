// 字符图案
import logger from '#logger';
import config from '#config/system';

// 在服务运行完毕打印字符图案
export const printStartCharPattern = async () => {
  const message = [
    '',
    '           ▍ ★∴',
    '　s ．t ．▍▍a．..r．█▍ ☆ ★∵t ..../ ',
    '　　◥█▅▅██▅▅██▅▅▅▅▅███◤ ',
    ' 　 ．◥███████████████◤',
    '～～～～◥█████████████◤～～～～',
    '～～～～～～～～～～～～～～～～～～～～～～～～',
    `当前服务: localhost:${config.port}`,
    `graphql 服务: localhost:${config.port}${config.graphql.path}`,
  ].join('\n');
  logger({ message, level: 'warn', label: '昆仑虚重启中' });
};

export const space = {};
