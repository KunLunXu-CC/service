import fs from 'fs';
import http from 'http';
import https from 'https';
import config from '#config/system';
import { importFiles } from '#utils/fs';

// 1. 获取当前目录下所有 WebSocket 服务配置
const wssList = await importFiles({
  dir: new URL('.', import.meta.url),
  filter: (v) => /[^index]\.js$/.test(v),
});

// 2. 创建服务
const server = config.https
  ? https.createServer({
    key: fs.readFileSync(new URL('../../docker/nginx/ssl.key', import.meta.url)),
    cert: fs.readFileSync(new URL('../../docker/nginx/ssl.pem', import.meta.url)),
  })
  : http.createServer();

// 3. 监听 upgrade 事件: 分发到不同的 WebSocket 服务
server.on('upgrade', (request, socket, head) => {
  // 3.1 根据 url 查询 WebSocket
  const { wss } = wssList.find(
    ({ value }) => value.path === request.url,
  )?.value ?? {};

  // 3.2 控制处理
  if (!wss) {
    socket.destroy();
    return false;
  }

  // 3.3 处理 upgrade => 发起连接
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// 4. 启动服务器并监听连接
server.listen(config.wsPort, () => {
  // TODO: 打印信息
});
