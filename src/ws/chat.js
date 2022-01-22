import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('%c [ ws ]', 'font-size:13px; background:pink; color:#bf2c9f;', ws);
  // TODO: 身份校验, 通过携带的 protocol(JWT)
  // ws.close();
});

export default {
  wss,
  path: '/chat',
};
