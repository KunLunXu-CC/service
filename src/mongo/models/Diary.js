import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 日记
const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    title: '当前日记式化后日期(YYYY-MM-DD), 其实就是时间',
  },
  getUp: {
    type: Date,
    title: '起床(起居)时间',
  },
  toRest: {
    type: Date,
    title: '歇息(碎觉)时间',
  },
  diet: {
    title: '饮食',
    type: [{
      type: {
        title: '类型',
        type: Number,
        required: true,
      },
      desc: {
        title: '描述',
        type: String,
      },
    }],
  },
  fitness: {
    title: '健身',
    type: [{
      type: {
        title: '类型',
        type: Number,
        required: true,
      },
      place: {
        title: '部位',
        type: Number,
      },
    }],
  },
  bill: {
    title: '账单',
    type: [{
      desc: {
        title: '描述',
        type: String,
      },
      tag: {
        title: '标签',
        type: Number,
      },
      income: {
        default: 0,
        title: '收入',
        type: Number,
      },
      expend: {
        default: 0,
        title: '支出',
        type: Number,
      },
    }],
  },
  bodyIndex: {
    title: '身体指数',
    type: {
      weight: {
        title: '体重(kg)',
        type: Number,
      },
      muscle: {
        title: '肌肉(kg)',
        type: Number,
      },
      moistureContent: {
        title: '水分(百分比)',
        type: Number,
      },
      bodyfat: {
        title: '体脂(百分比)',
        type: Number,
      },
      bim: {
        title: 'BIM',
        type: Number,
      },
    },
  },
  informalEssay: {
    title: '随笔',
    type: String,
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
schema.index({ name: 1, creator: 1, isDelete: 1 }, { unique: true });

export default schema;
