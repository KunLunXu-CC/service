const mongoose = require('mongoose');
const { STATUS, BOOLEAN } = require('../../config/consts');
const { ObjectId } = mongoose.Schema.Types;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '角色';
exports.type = 'MongoDB';

exports.fields = {
  name: {
    unique: true,
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
