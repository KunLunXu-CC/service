const mongoose = require('mongoose');
const { STATUS } = require('../config/consts');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '看板任务';
exports.type = 'MongoDB';

exports.fields = {
  name: {
    type: String,
    title: '名称',
  },
  desc: {
    type: String,
    title: '描述',
  },
  kanban: {
		title: '所属看板',
		type: ObjectId,
  },
  group: {
		title: '所属看板分组',
		type: ObjectId,
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
