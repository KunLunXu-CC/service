// const { WS_TYPE } = require('../../config/consts');

/**
 * 连接 WebSocket, 处理日志相关业务
 * 前端需要在 protocol 中添加 jwt 用于身份验证
 * @param {Object} wss WebSocket 实例
 */
module.exports = wss => {
  wss.on('connection', ws => {
    // const { protocol } = ws;
    // TODO: 需要身份校验
    ws.on('message', message => {
        console.log('received: %s', message);
    });

    // ws.send('something');
  });
}
