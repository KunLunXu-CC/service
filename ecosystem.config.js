module.exports = {
  apps : [{
    name: "app",
    script: "./app/app.js",
    watch: true,
    env: {
      // NODE_ENV: "development",
      
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}