const gulp = require('gulp');
const { createSecretKey, createTmpToken } = require('./rsa');

module.exports = {
  createSecretKey,                                // config/system 下创建秘钥
  createTmpToken,                                 // 创建临时 token
  initDB: require('./initDB'),                    // 执行初始化脚本
  restartDocker: require('./restartDocker'),      // 重启 docker(将更新docker容器)
  default: async () => {},
};
