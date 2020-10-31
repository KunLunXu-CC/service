const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
  // ...
  console.log('connection wss1');
});

module.exports = wss;

/*
var ws = new WebSocket("ws://localhost:4000/ws/logger", 'protocol');

ws.onopen = function(evt) {
  console.log("Connection open ...");
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: ", evt.data);
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};
*/
