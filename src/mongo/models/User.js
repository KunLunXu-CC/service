import mongoose from 'mongoose';
import { SEX, BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 用户
const schema = new Schema({
  name: {
    title: '用户名',
    required: true,
    type: String,
  },
  account: {
    title: '账号',
    required: true,
    type: String,
  },
  password: {
    title: '密码',
    required: true,
    type: String,
  },
  avatar: {
    title: '头像',
    type: String,
  },
  motto: {
    title: '座右铭(个签)',
    type: String,
  },
  role: {
    title: '角色',
    require: true,
    type: ObjectId,
  },
  sex: {
    title: '性别',
    type: Number,
    default: SEX.BOY,
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
schema.index({ account: 1, isDelete: 1 }, { unique: true });

export default schema;
