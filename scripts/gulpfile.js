const gulp = require('gulp');
const { createProKey } = require('./rsa');

module.exports = {
  createProKey,                                   // config/system 下创建秘钥
  initDB: require('./initDB'),                    // 执行初始化脚本
  restartDocker: require('./restartDocker'),      // 重启 docker(将更新docker容器)
  default: async () => {},
};
