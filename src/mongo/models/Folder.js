import mongoose from 'mongoose';
import { STATUS, FOLDER_TYPE } from '#config/consts';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 目录
const schema = new Schema({
  type: {
    title: '类型',
    type: Number,
    required: true,
    default: FOLDER_TYPE.ARTICLE,
  },
  name: {
    type: String,
    title: '显示名',
    required: true,
  },
  desc: {
    type: String,
    title: '描述',
  },
  parent: {
    title: '父级',
    type: ObjectId,
  },
  status: {
    title: '状态',
    default: STATUS.ENABLE,
    type: Number,
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
