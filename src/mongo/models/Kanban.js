import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 看板
const schema = new Schema({
  name: {
    type: String,
    title: '名称',
    required: true,
  },
  desc: {
    type: String,
    title: '描述',
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
