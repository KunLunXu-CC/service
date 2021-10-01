import WebSocket from 'ws';
import mongoose from 'mongoose';
import { APP_CODE } from '../../../config/consts.mjs';
import { verifyJwt } from '../../../utils/encryption.mjs';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', async (ws) => {
  // 1. 对 ws.protocol(JWT) 进行校验
  const data = await verifyJwt(ws.protocol);

  // 2. 获取角色信息
  const role = data.role
    ? await mongoose.model('Role')?.findOne({ _id: data.role })
    : {};

  // 3. 判断当前角色是否具有权限, 没有则关闭连接
  !(role.auth || []).find((v) => v.code === APP_CODE.LOGGER) && ws.close();
});

export default wss;

/*
// 前端连接: protocol 身份校验(JWT)
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
