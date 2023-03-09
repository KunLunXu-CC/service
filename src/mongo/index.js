import _ from 'lodash';
import logger from '#logger';
import mongoose from 'mongoose';
import config from '#config/system';
import { importFiles } from '#utils/fs';

export default async () => {
  const models = await importFiles({ dir: new URL('./models', import.meta.url) });
  const { mongo: { host, port, database, debug } } = config;

  try {
    // 1. 连接数据库
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, {});
    mongoose.set('debug', debug);
    mongoose.set('strictQuery', true);

    // 2. 添加模型
    for (const { fileName, value: schema } of models) {
      const model = await mongoose.model(fileName, schema);
      model.syncIndexes();
    }

    // 延时 0.5s: 等待模型加载完成
    await new Promise((resolve) => _.delay(resolve, 1000 * 0.5));
  } catch (message) {
    logger({ level: 'error', label: '数据库连接', message });
  }
};
