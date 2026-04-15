import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 用户配置
const schema = new Schema({
  appKey: {
    title: '应用标识',
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    title: '用户',
    type: ObjectId,
    required: true,
  },
  configKey: {
    title: '配置标识',
    type: String,
    required: true,
    trim: true,
  },
  config: {
    title: '配置内容',
    type: Schema.Types.Mixed,
    default: () => ({}),
  },
  remark: {
    title: '备注',
    type: String,
  },
  creator: {
    title: '创建人',
    type: ObjectId,
  },
  creationTime: {
    title: '创建时间',
    type: Date,
    default: Date.now,
  },
  updater: {
    title: '最近更新人',
    type: ObjectId,
  },
  updateTime: {
    title: '最近更新时间',
    type: Date,
    default: Date.now,
  },
  isDelete: {
    title: '是否删除',
    type: Schema.Types.Mixed,
    default: BOOLEAN.FALSE,
  },
});

// 1. 复合唯一索引 see: https://github.com/Automattic/mongoose/issues/3955、 https://docs.mongodb.org/manual/tutorial/create-a-unique-index/#unique-compound-index
schema.index({
  appKey: 1,
  userId: 1,
  configKey: 1,
  isDelete: 1,
}, { unique: true });

export default schema;
