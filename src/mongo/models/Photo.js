import mongoose from 'mongoose';
import { PHOTO_TYPE, BOOLEAN } from '#config/constants';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// 照片
const schema = new Schema({
  name: {
    unique: true,
    title: '上传后文件名',
    required: true,
    type: String,
  },
  sourceFileName: {
    title: '上传前源文件名',
    type: String,
  },
  originFileName: {
    title: '上传后, 未压缩的文件名',
    type: String,
  },
  type: {
    title: '图片类型(使用场景)',
    default: PHOTO_TYPE.UNKNOWN,
    type: Number,
  },
  payload: {
    title: '载体(图片使用载体, 如果在文章中被使用则表示文章ID)',
    type: ObjectId,
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
