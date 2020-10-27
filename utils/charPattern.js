// 字符图案
const system = require('../config/system');
const logger = require('./logger');

// 在服务运行完毕打印字符图案
module.exports.printStartCharPattern = () => {
  const pattern = [
    "",
            "           ▍ ★∴",
    　"　s ．t ．▍▍a．..r．█▍ ☆ ★∵t ..../ ",
    "　　◥█▅▅██▅▅██▅▅▅▅▅███◤ ",
    " 　 ．◥███████████████◤",
    "～～～～◥█████████████◤～～～～",
    "～～～～～～～～～～～～～～～～～～～～～～～～",
    `当前服务：localhost:${system.port}`,
    `graphql 服务：localhost:${system.port}${system.graphql.path}`,
  ];
  logger.info(pattern.join('\n'))
}
