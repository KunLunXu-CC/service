const mongo = require('../utils/mongo');

module.exports = (app) => {
  // 绑定 db: 数据库
  app.context.db = { mongo };
}
