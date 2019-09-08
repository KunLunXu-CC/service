module.exports = {
  apps : [{
    name: 'app',
    script: './app/app.js',

    watch: true,
    ignore_watch: ['node_modules', 'docker', '.git']
    watch_delay: 1000 * 60 * 1,
  }]
}
