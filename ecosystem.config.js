module.exports = {
  apps : [
    {
      name: 'app',
      watch: true,
      script: './app/app.js',
      env: {
        "NODE_ENV": "production",
      },
      env_development: {
        "NODE_ENV": "development",
        watch: [
          'app',
          'config',
          'html',
          'models',
          'utils',
        ],
      }
    },
    {
      name: 'cron',  //定时任务
      watch: ['cron'],
      script: './cron',
      env: {
        "NODE_ENV": "production",
      },
      env_development: {
        "NODE_ENV": "development",
        watch: [
          'app',
          'config',
          'html',
          'models',
          'utils',
        ],
      }
    }
  ]
}
