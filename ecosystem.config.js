module.exports = {
  apps : [{
    name: 'app',
    watch: true,
    script: './app/app.js',
    watch: ['app', 'config', 'models', 'utils'],
    // ignore_watch: ['node_modules', 'docker', 'html', '.git'],
    watch_delay: 1000 * 60 * 5,
  }]
}
