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
  } catch (e) {
    console.log('%c [ e ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', e);
    logger.error('数据库连接错误！');
  }

  // 2. 添加模型
  const { Schema } = mongoose;

  for (const [name, value] of Object.entries(models)) {
    await mongoose.model(name, new Schema(value));
  }

  // 延时 0.5s: 等待模型加载完成
  await new Promise((resolve) => _.delay(resolve, 1000 * 0.5));
};
