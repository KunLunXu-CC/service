const mongoose = require('mongoose');
const { STATUS } = require('../../config/consts');
const { ObjectId } = mongoose.Schema.Types;

exports.title = '算法';
exports.type = 'MongoDB';

exports.fields = {
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
