import _ from 'lodash';
import logger from '#logger';
import mongoose from 'mongoose';
import config from '#config/system';
import { importFiles } from '#utils/fs';

export default async () => {
  const models = await importFiles({ dir: new URL('./models', import.meta.url) });
  const { mongo: { host, port, database, debug } } = config;

  // 1. 连接数据库
  try {
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    mongoose.set('debug', debug);
  } catch (error) {
    logger.error({ title: '数据库连接错误！', error });
  }

  // 2. 添加模型
  const { Schema } = mongoose;

  for (const { fileName, value } of models) {
    await mongoose.model(fileName, new Schema(value));
  }

  // 延时 0.5s: 等待模型加载完成
  await new Promise((resolve) => _.delay(resolve, 1000 * 0.5));
};
