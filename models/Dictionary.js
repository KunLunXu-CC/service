const mongoose = require('mongoose');
const { STATUS, SEX } = require('../config/consts');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '用户';
exports.type = 'MongoDB';

exports.fields = {
  name: {
    type: String,
    title: '显示名',
		required: true,
  },
  desc: {
    type: String,
    title: '描述',
  },
  code: {
    type: String,
		required: true,
    title: '数据字典类型_标识',
  },
  parent: {
		title: '父级',
		type: ObjectId
  },

	status: {
		title: '状态',
		default: STATUS.ENABLE,
		type: Number,
	},
	creator: {
		title: '创建人',
		type: ObjectId
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
