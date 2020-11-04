const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
// const { verifyJwt } = require('../../../utils/encryption');

wss.on('connection', function connection(ws) {
  const { protocol } = ws;
  // const data = verifyJwt(protocol);
  console.log('data1111111', protocol, data);
  // TODO: 身份校验, 通过携带的 protocol(JWT)

  // ws.close();
});

module.exports = wss;

/*
// 前端连接
var ws = new WebSocket('ws://localhost:4000/ws/logger', 'protocol');

ws.onopen = function(evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets! logger');
};

ws.onmessage = function(evt) {
  console.log( 'Received Message: ', JSON.parse(evt.data));
};

ws.onclose = function(evt) {
  console.log('Connection closed.');
};
*/
