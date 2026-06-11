import mongoose from 'mongoose';
import { BOOLEAN, DATA_SCOPE } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// BotMate
const schema = new Schema({
  name: {
    type: String,
    title: '名称',
    required: true,
  },
  avatar: {
    type: String,
    title: '头像',
  },
  description: {
    type: String,
    title: '描述',
  },
  systemPrompt: {
    type: String,
    title: '系统提示词',
  },
  skillIds: {
    type: [ObjectId],
    title: '技能',
    default: [],
  },
  memoryFileIds: {
    type: [ObjectId],
    title: '记忆文件',
    default: [],
  },

  scope: {
    type: String,
    enum: Object.values(DATA_SCOPE),
    default: DATA_SCOPE.USER,
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
