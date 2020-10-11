const mongoose = require('mongoose');
const { ARTICLE_STATUS } = require('../config/consts');
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.title = '文章';
exports.type = 'MongoDB';

exports.fields = {
  name: {
    unique: true,
		title: '标题',
    required: true,
		type: String,
  },
  desc: {
    title: '描述（概要）',
		type: String,
  },
  thumb: {
    title: "缩略图",
    type: String
  },
  tags: {
    default: [],
    title: '标签',
    type: [Number],
  },
  type: {
    type: Number,
    title: '文章类型',
    required: true,
  },
  content: {
    title: '内容',
		type: String,
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
}
