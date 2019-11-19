const { BOOLEAN } = require('../../config/conts');
const { defaultUser } = require('../../config/system');

module.exports = {
  Role: [
    {
      name : 'tourist',
      desc : '游客',
      isAdmin:  BOOLEAN.FALSE,
      auth : [
        { code: 'article', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
      ],
    },
    {
      name : 'admin',
      desc : '管理员',
      isAdmin:  BOOLEAN.TRUE,
      auth : [
        { code: 'album', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
        { code: 'editor', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
        { code: 'article', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
        { code: 'note', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE },
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
  ],
  Tag: [
    {
      name: '前端',
      color: 'red',
      icon: 'icon-qianduan',
      children: [
        {
          name: 'JS',
          color: 'JS',
          icon: 'icon-js',
        },
        {
          name: 'CSS',
          color: 'CSS',
          icon: 'icon-CSS-',
        },
        {
          name: 'Less',
          color: 'Less',
          icon: 'icon-less',
        },
        {
          name: 'Sass',
          color: 'Sass',
          icon: 'icon-sass',
        },
        {
          name: 'React',
          color: 'React',
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
          color: 'Git',
          icon: 'icon-git',
        },
        {
          name: 'Webpack',
          color: 'Webpack',
          icon: 'icon-webpack',
        },
        {
          name: 'Gulp',
          color: 'Gulp',
          icon: 'icon-gulp',
        },
        {
          name: 'Docker',
          color: 'Docker',
          icon: 'icon-docker',
        },
        {
          name: 'Jinkens',
          color: 'Jinkens',
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
          color: 'Node',
          icon: 'icon-js1',
        },
        {
          name: 'Koa',
          color: 'Koa',
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
          color: 'Shell',
          icon: 'icon-fileshell',
        },
        {
          name: 'Cli',
          color: 'Cli',
          icon: 'icon-fileshell',
        }
      ]
    }
  ],
};
