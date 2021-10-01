import _ from 'lodash';
import mongoose from 'mongoose';
import logger from '../utils/logger.mjs';
import * as models from './models/index.mjs';
import getConfig from '../config/system/index.mjs';

export default async () => {
  const { mongo: { host, port, database, debug } } = await getConfig();

  // 1. 连接数据库
  try {
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    mongoose.set('debug', debug);
  } catch (e) {
    logger.info('数据库连接错误！');
  }

  // 2. 添加模型
  const { Schema } = mongoose;

  for (const [name, value] of Object.entries(models)) {
    await mongoose.model(name, new Schema(value));
  }

  // 延时 0.5s: 等待模型加载完成
  await new Promise((resolve) => _.delay(resolve, 1000 * 0.5));
};
