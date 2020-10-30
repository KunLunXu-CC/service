const WebSocket = require('ws');
const url = require('url');

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

wss1.on('connection', function connection(ws) {
  // ...
});

wss2.on('connection', function connection(ws) {
  // ...
});

module.exports  = server => {
  server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    console.log('------------------1111111');

    // if (pathname === '/ws/foo') {
    //   wss1.handleUpgrade(request, socket, head, function done(ws) {
    //     wss1.emit('connection', ws, request);
    //   });
    // } else if (pathname === '/ws/bar') {
    //   wss2.handleUpgrade(request, socket, head, function done(ws) {
    //     wss2.emit('connection', ws, request);
    //   });
    // } else {
    //   socket.destroy();
    // }
  });
}
