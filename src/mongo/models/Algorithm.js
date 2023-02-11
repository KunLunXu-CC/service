import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 算法
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
});

export default schema;
