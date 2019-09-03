module.exports = {
  apps : [{
    name: "app",
    script: "./app/app.js",
    watch: true,
    env: {
      NODE_ENV: "production"
    }
  }]
}
