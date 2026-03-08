import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 链接集
const schema = new Schema({
  name: {
    title: '链接名称',
    required: true,
    type: String,
  },
  link: {
    title: '链接',
    type: String,
  },
  parent: {
    title: '父级链接集ID',
    type: ObjectId,
  },
  icon: {
    title: '标签图标',
    type: String,
  },
  desc: {
    title: '链接集描述',
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
  name: 1,
  creator: 1,
  isDelete: 1,
}, { unique: true });

export default schema;
