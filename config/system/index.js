let systemConf = require('./development');

// 尝试根据当前环境调用配置文件
try {
  systemConf = require(`./${(process.env.NODE_ENV || 'development')}`);
} catch(e) {
  console.log(`未找到配置文件, 当前环境 NODE_ENV = ${process.env.NODE_ENV}`);
}

module.exports = systemConf;
