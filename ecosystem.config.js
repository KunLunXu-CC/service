module.exports = {
  apps : [
    {
      name: 'app',
      watch: true,
      script: './app/app.js',
      watch: [
        'app',
        'config',
        'html',
        'models',
        'utils',
      ],
      // watch_delay: 1000 * 60 * 5,
      env: {
        "NODE_ENV": "production"
      },
      env_development: {
        "NODE_ENV": "development",
      }
    },
    {
      name: 'cron',  //定时任务
      watch: ['cron'],
      script: './cron',
      env: {
        "NODE_ENV": "production"
      },
      env_development: {
        "NODE_ENV": "development",
      }
    }
  ]
}
