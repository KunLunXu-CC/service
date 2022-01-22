```js
import url from 'url';
import chat from './chat.js';
import logger from './logger.js';

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
```

## 前端连接 

```js
// protocol 携带(身份认证等)
var ws = new WebSocket('ws://localhost:4001/foo', 'protocol');

ws.onopen = function(evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets! chat');
};

ws.onmessage = function(evt) {
  console.log( 'Received Message: ', JSON.parse(evt.data));
};

ws.onclose = function(evt) {
  console.log('Connection closed.');
};
```
