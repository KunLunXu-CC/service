import mongoose from 'mongoose';
import { ARTICLE_STATUS, BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 文章
const schema = new Schema({
  name: {
    title: '标题',
    required: true,
    type: String,
  },
  folder: {
    title: '文件夹',
    type: ObjectId,
    required: true,
  },
  content: {
    title: '内容',
    type: String,
  },
  desc: {
    title: '描述（概要）',
    type: String,
  },
  thumb: {
    title: '缩略图',
    type: String,
  },
  tags: {
    default: [],
    title: '标签',
    type: [ObjectId],
  },
  viewCount: {
    default: 0,
    type: Number,
    title: '阅读统计',
  },
  viewHistory: {
    default: [],
    type: [String],
    title: '阅读记录',
  },
  status: {
    title: '状态',
    type: Number,
    default: ARTICLE_STATUS.SAVE, // 默认状态为 保存(未发布)
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
schema.index({ name: 1, folder: 1, isDelete: 1 }, { unique: true });

export default schema;
