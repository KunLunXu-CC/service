const path = require('path');
const WebSocket = require('ws');

const { requireFiles } = require('../../../utils');

// wss: WebSocket 实例
let wss = null;

/**
 * 创建 WebSocket 实例
 * @param {Object} server koa 实例
 */
module.exports.createWebSocket = server => {
  // 1. 创建服务
  wss = new WebSocket.Server({ server, protocol: '1' });

  // 2. 需要连接的服务, 每个服务通过 type 进行判断区分
  const connections = requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: [path.resolve(__dirname, './index.js')],
  });
  Object.values(connections).forEach(connection => connection(wss));
}

/**
 * 获取 wss: WebSocket 实例
 */
module.exports.getWss = () => wss;

// 广播
// wss.clients.forEach(function each(client) {
//   if (client !== ws && client.readyState === WebSocket.OPEN) {
//     client.send(data);
//   }
// });
