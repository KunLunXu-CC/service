import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 标签
const schema = new Schema({
  name: {
    unique: true,
    title: '标签名称',
    required: true,
    type: String,
  },
  parent: {
    title: '父级标签ID',
    type: ObjectId,
  },
  color: {
    title: '标签色值',
    type: String,
    default: '#5BCCFF',
  },
  icon: {
    title: '标签图标',
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
});

export default schema;
