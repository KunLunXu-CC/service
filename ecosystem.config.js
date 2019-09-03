module.exports = {
  apps : [{
    name: 'app',
    script: './app/app.js',
    watch: true,
    ignore_watch: ['node_modules', 'docker']
    env: {
      NODE_ENV: 'production'
    }
  }]
}
