const { BOOLEAN } = require('../../config/conts');

module.exports.Role = {
  title: '系统角色',
  db: [
    {
      name : 'tourist',
      desc : '游客',
      auth : [
          { 'code' : 'tag'}
      ],
    },
    {
      name : 'admin',
      desc : '管理员',
      auth : [
          { 'code' : 'tag', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE }
      ],
    }
  ],
};

module.exports.User = {
  title: '系统用户',
  db: [
    {
      name: '游客',
      account: 'tourist',
      password: '111111',
      role: { type: 'objectId', find: { Role: { name : 'tourist' } }},
    },
    {
      name: '管理员',
      account: 'admin',
      password: '123456',
      role: { type: 'objectId', find: { Role: { name : 'admin' } }},
    },
  ],
};