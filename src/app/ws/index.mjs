import url from 'url';
import chat from './chat/index.mjs';
import logger from './logger/index.mjs';

// WebSocket 实例配置列表: pathname 服务路由、wss WebSocket 实例
const WS_SETTING_LIST = [
  {
    pathname: '/ws/logger',
    wss: logger,
  },
  {
    pathname: '/ws/chat',
    wss: chat,
  },
];

export default (server) => {
  // 监听 ws
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = url.parse(request.url);
    const setting = WS_SETTING_LIST.find((v) => v.pathname === pathname);

    setting
      ? setting.wss.handleUpgrade(request, socket, head, (ws) => {
        setting.wss.emit('connection', ws, request);
      })
      : socket.destroy();
  });
};
