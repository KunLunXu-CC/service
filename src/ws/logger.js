import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import { APP_CODE } from '#config/consts';
import { verifyJwt } from '#utils/encryption';

const wss = new WebSocketServer({ noServer: true });


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

export default { wss, path: '/logger' };
