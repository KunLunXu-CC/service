import mongoose from 'mongoose';
import {
  BOOLEAN,
  DATA_SCOPE,
  BOT_MATE_CONVERSATION_TYPE,
} from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// BotMate 会话
const schema = new Schema({
  title: {
    type: String,
    title: '标题',
  },
  type: {
    type: String,
    title: '类型',
    enum: Object.values(BOT_MATE_CONVERSATION_TYPE),
    default: BOT_MATE_CONVERSATION_TYPE.SINGLE,
  },
  mateIds: {
    type: [ObjectId],
    title: 'Mate',
    default: [],
  },
  lastMessage: {
    type: String,
    title: '最后消息',
  },
  lastMessageAt: {
    type: Date,
    title: '最后消息时间',
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
