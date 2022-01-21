import WebSocket from 'ws';
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('%c [ ws ]', 'font-size:13px; background:pink; color:#bf2c9f;', ws);
  // TODO: 身份校验, 通过携带的 protocol(JWT)
  // ws.close();
});

export default wss;

/*
// 前端连接
var ws = new WebSocket('ws://localhost:4000/ws/chat', 'protocol');

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
*/
