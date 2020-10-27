const WebSocket = require('ws');

module.exports = server => {
  console.log('------\n\n\n\n\n', server.context);
  const wss = new WebSocket.Server({ server });
  wss.on('connection', ws => {
      // 绑定websocket对象
      ws.wss = wss;
      console.log(`[SERVER] connection`);
      // 接收到数据
      ws.on('message', function(msg) {
          console.log(`[SERVER] Received: ${msg}`);
          // 发送数据
          ws.send(`ECHO: ${msg}`, err => {
              if(err) console.log(`[SERVER] error: ${err}`);
          });
      });
      // ...
  });
}
