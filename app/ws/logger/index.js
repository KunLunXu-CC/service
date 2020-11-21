const WebSocket = require('ws');
const mongo = require('../../../utils/mongo');
const { verifyJwt } = require('../../../utils/encryption');

const wss = new WebSocket.Server({ noServer: true });
const db = mongo();

/**
 * 校验权限
 * @param {*} jwt json web token
 * @return {Boolean} 是否具有权限
 */
const verifyPermissions = async jwt => {
  const data = await verifyJwt('jwt');
  console.log((await verifyJwt('jwt')).role, 'data');
  console.log((await verifyJwt(jwt)).role, 'data');

  // db.Role.find({ _id:  });

  // const { protocol } = ws;
  // const data = verifyJwt(protocol);
  // console.log('data1111111', protocol, data);
};

wss.on('connection', function connection(ws) {
  verifyPermissions(ws.protocol);
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
