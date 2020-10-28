const WebSocket = require('ws');
let wss = null;

module.exports.createWebSocket = server => {
  wss = new WebSocket.Server({
    server
  });

  wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message);
    });
    ws.send('something');
  });
}

module.exports.getWss = () => wss;

// wss.clients.forEach(function each(client) {
//   if (client !== ws && client.readyState === WebSocket.OPEN) {
//     client.send(data);
//   }
// });
