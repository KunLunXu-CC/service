import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import mongoose from 'mongoose';
import logger from '#logger';
import config from '#config/system';

// 读取所有模型
const getModels = async () => {
  const models = {};
  // 读取所以文件
  const files = fs.readdirSync(new URL('./models', import.meta.url));

  // 遍历
  for (const file of files) {
    const modelPath = new URL(`./models/${file}`, import.meta.url);
    const { default: model } = await import(modelPath);
    models[path.basename(file, '.js')] = model;
  }

  return models;
};

export default async () => {
  const models = await getModels();
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
