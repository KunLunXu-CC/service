const { BOOLEAN } = require('../../config/conts');
const { defaultUser } = require('../../config/system');

module.exports = {
  Role: [
    {
      name : 'tourist',
      desc : '游客',
      auth : [
        { 'code' : 'tag', readable: BOOLEAN.TRUE, writable:BOOLEAN.FALSE }
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
  User: [
    {
      name: '游客',
      password: '111111',
      role: 'tourist',
      account: defaultUser,
    },
    {
      name: '管理员',
      account: 'admin',
      password: '123456',
      role: 'admin',
    },
  ]
};