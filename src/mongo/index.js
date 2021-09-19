const _ = require('lodash');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../config/system');
const { requireFiles } = require('../utils');

module.exports = async () => {
  // 1. 连接数据库
  try {
    const { host, port, database, debug } = config.mongo || {};
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    mongoose.set('debug', debug);
  } catch (e) {
    logger.info('数据库连接错误！');
  }

  // 2. 添加模型
  const models = requireFiles({ dir: path.resolve(__dirname, './models') });
  const { Schema } = mongoose;

  for (const [fileName, value] of Object.entries(models)) {
    if (value.type === 'MongoDB') {
      models[fileName] = await mongoose.model(
        fileName,
        new Schema(value.fields),
      );
    }
  }

  // 延时 0.5s: 等待模型加载完成
  await new Promise((resolve) => _.delay(resolve, 1000 * 0.5));
};
