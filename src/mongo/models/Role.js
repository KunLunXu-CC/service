import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 角色
const schema = new Schema({
  name: {
    title: '角色名',
    required: true,
    type: String,
  },
  type: {
    type: Number,
    required: true,
    title: '角色类型',
  },
  desc: {
    title: '角色描述',
    type: String,
  },
  apiAuth: {
    title: '接口权限',
    type: [{
      path: {
        title: '接口路径(name)',
        type: String,
      },
    }],
  },
  auth: {
    title: '角色权限',
    type: [{
      name: {
        title: '应用名称',
        type: String,
      },
      code: {
        title: '应用唯一编码',
        type: String,
      },
      readable: {
        title: '是否可读',
        type: Number,
        default: BOOLEAN.FALSE,
      },
      writable: {
        title: '是否可写',
        type: Number,
        default: BOOLEAN.FALSE,
      },
    }],
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
schema.index({ name: 1, isDelete: 1 }, { unique: true });

export default schema;
