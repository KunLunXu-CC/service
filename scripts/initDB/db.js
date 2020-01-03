const { BOOLEAN, ROLE_TYPE } = require('../../config/consts');
const { defaultUser } = require('../../config/system');

module.exports = {
  Role: [
    {
      name : 'tourist',
      desc : '游客',
      type: ROLE_TYPE.TOURIST,
      auth : [
        { code: 'article', readable: BOOLEAN.TRUE, writable: BOOLEAN.TRUE },
      ],
    },
    {
      name : 'admin',
      desc : '管理员',
      type: ROLE_TYPE.ADMIN,
      auth : [
        { code: 'album', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
        { code: 'editor', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
        { code: 'article', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
      ],
    }
  ],
  User: [
    {
      name: '游客',
      role: 'tourist',
      account: defaultUser,
      password: '123456',
    },
    {
      name: '管理员',
      account: 'admin',
      password: '123456',
      role: 'admin',
    },
  ],
  Tag: [
    {
      name: '前端',
      color: 'red',
      icon: 'icon-qianduan',
      children: [
        {
          name: 'JS',
          color: 'red',
          icon: 'icon-js',
        },
        {
          name: 'HTML',
          color: 'red',
          icon: 'icon-html',
        },
        {
          name: 'CSS',
          color: 'red',
          icon: 'icon-CSS-',
        },
        {
          name: 'Less',
          color: 'red',
          icon: 'icon-less',
        },
        {
          name: 'Sass',
          color: 'red',
          icon: 'icon-sass',
        },
        {
          name: 'React',
          color: 'red',
          icon: 'icon-react',
        }
      ]
    },
    {
      name: '工具',
      color: '工具',
      icon: 'icon-gongju',
      children: [
        {
          name: 'Git',
          color: 'red',
          icon: 'icon-git',
        },
        {
          name: 'Webpack',
          color: 'red',
          icon: 'icon-webpack',
        },
        {
          name: 'Gulp',
          color: 'red',
          icon: 'icon-gulp',
        },
        {
          name: 'Docker',
          color: 'red',
          icon: 'icon-docker',
        },
        {
          name: 'Jinkens',
          color: 'red',
          icon: 'icon-jenkins',
        },
      ]
    },
    {
      name: '后端',
      color: '后端',
      icon: 'icon-houtaituichufanhuichu',
      children: [
        {
          name: 'Node',
          color: 'red',
          icon: 'icon-js1',
        },
        {
          name: 'Koa',
          color: 'red',
          icon: 'icon-js1',
        }
      ]
    },
    {
      name: '自动化',
      color: '自动化',
      icon: 'icon-oper-auto-1',
      children: [
        {
          name: 'Shell',
          color: 'red',
          icon: 'icon-fileshell',
        },
        {
          name: 'Cli',
          color: 'red',
          icon: 'icon-fileshell',
        }
      ]
    }
  ],
};
