// pm2 配置文件
/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'app',
      watch: true,
      script: 'node -- ./src/app',
      env: {
        NODE_ENV: 'production',
        watch: false,
      },
      env_development: {
        NODE_ENV: 'development',
        watch: ['src'],
      },
    },
    {
      name: 'ws',
      watch: true,
      script: 'node -- ./src/ws',
      env: {
        NODE_ENV: 'production',
        watch: false,
      },
      env_development: {
        NODE_ENV: 'development',
        watch: ['src'],
      },
    },
    {
      name: 'cron',  // 定时任务
      script: 'node -- ./src/cron',
      env: {
        NODE_ENV: 'production',
        watch: false,
      },
      env_development: {
        NODE_ENV: 'development',
        watch: ['src/cron'],
      },
    },
  ],
};
