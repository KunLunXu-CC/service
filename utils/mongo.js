const _ = require('lodash');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../config/system');
const { requireFiles } = require('.');

const Schema = mongoose.Schema;

/**
 * 链接数据库
 */
const connectServer = () => {
  try{
    const mongoSetting = config.mongo || {};
    const options = {
      useNewUrlParser: true,
    };
    const host = mongoSetting.host;
    const port = mongoSetting.port;
    const database = mongoSetting.database;
    mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    mongoose.set('debug', mongoSetting.debug);
  }catch(e){
    logger.info('数据库连接错误！');
  }
}

/**
 * 初始化模型：
 * @return {Object} {模型名： 模型对象}
 */
const initModels = () =>{
  const models = {};
  const stree = requireFiles({ dir: path.resolve(__dirname, '../models') });
  _.forIn(stree, (value, fileName) => {
    if (value.type === 'MongoDB'){
      models[fileName] = mongoose.model(fileName, new Schema(value.fields))
    }
  });
  return models;
}

// 导出方法
module.exports = () => {
  connectServer();
  return initModels();
}
