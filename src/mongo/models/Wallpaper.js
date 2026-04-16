import mongoose from 'mongoose';
import { BOOLEAN, WALLPAPER_CATEGORY } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: {
    title: '壁纸名称',
    required: true,
    type: String,
  },
  description: {
    title: '壁纸描述',
    type: String,
  },
  url: {
    title: '原图地址',
    required: true,
    type: String,
  },
  thumbnailUrl: {
    title: '缩略图地址',
    type: String,
  },
  category: {
    title: '分类',
    type: Number,
    default: WALLPAPER_CATEGORY.OTHER,
  },
  sort: {
    title: '排序',
    type: Number,
    default: 0,
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
