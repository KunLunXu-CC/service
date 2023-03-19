import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 片段(短文)
const schema = new Schema({
  content: {
    required: true,
    title: '内容',
    type: String,
  },
  tags: {
    default: [],
    title: '标签',
    type: [Number],
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

export default schema;
