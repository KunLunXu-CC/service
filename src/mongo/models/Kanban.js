import mongoose from 'mongoose';
import { STATUS } from '#config/consts';

const { ObjectId } = mongoose.Schema.Types;

// 看板
export default {
  name: {
    type: String,
    title: '名称',
    required: true,
  },
  desc: {
    type: String,
    title: '描述',
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
};