import _ from 'lodash';
import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

/**
 * 处理日期范围查询条件
 *
 * @param {string} startTime  开始时间
 * @param {string} endTime    结束时间
 * @returns {object} {$gte: xx, $lte: xx}
 */
const getTimeConds = (startTime, endTime) => {
  const conds = {};
  startTime && (conds.$gte = startTime);
  endTime && (conds.$lte = endTime);
  return conds;
};

/**
 * 获取处理函数
 *
 * @param params.params
 * @param {object} params 查询参数
 * @param {object} conds  查询条件
 * @param {string} key    当前处理值 key
 * @param {*}      value  当前处理值
 * @param params.conds
 * @param params.key
 * @param params.value
 */
const getHandler = ({ params, conds, key, value }) => ([
  {
    conds: key === 'id',
    handler: () => (conds._id = value),
  },
  {
    conds: key === 'ids',
    handler: () => (conds._id = { $in: value }),
  },
  {
    conds: key === 'names',
    handler: () => (conds.name = { $in: value }),
  },
  {
    conds: key === 'status',
    handler: () => (conds.status = _.isArray(value) ? { $in: value } : value),
  },
  {
    conds: ['startUpdateTime', 'endUpdateTime'].includes(key),
    handler: () => {
      if (conds.updateTime) {
        return false;
      }

      conds.updateTime = getTimeConds(
        params.startUpdateTime,
        params.endUpdateTime,
      );
    },
  },
  {
    conds: ['startCreationTime', 'endCreationTime'].includes(key),
    handler: () => {
      if (conds.creationTime) {
        return false;
      }

      conds.creationTime = getTimeConds(
        params.startCreationTime,
        params.endCreationTime,
      );
    },
  },
  // 特殊字段处理
  {
    conds: key === 'tag',
    // 传入值为一个 tag， 判断 tag 是否在数据 tags 数组中
    handler: () => (conds.tags = { $elemMatch: { $eq: value } }),
  },
  {
    conds: key === 'tags',
    // 传入值为一个 tag 数组， 判断传入数据和数据 tags 数组是否存在交集
    handler: () => (conds.tags = { $in: value }),
  },
  // 按值类型进行处理
  { // 值为 id 字段处理
    conds: mongoose.Types.ObjectId.isValid(value),
    handler: () => (conds[key] = value),
  },
  {
    conds: _.isNumber(value) || _.isBoolean(value),
    handler: () => (conds[key] = value),
  },
  {
    conds: _.isString(value),
    handler: () => (conds[key] = { $regex: value }),
  },
  {
    conds: _.isArray(value),
    handler: () => (conds[key] = { $in: value }),
  },
  {
    conds: value === null,
    handler: () => (conds[key] = { $in: [null, void 0] }),
  },
]);

/**
 * 获取查询条件
 *
 * @param {object} params 查询参数
 */
export default (params = {}) => {
  // 默认: 只查询没有被删除的数据
  const conds = { isDelete: BOOLEAN.FALSE };

  _.forIn(params, (value, key) => {
    const { handler } = getHandler({ params, conds, key, value }).find(
      (v) => v.conds,
    ) || {};
    handler && handler();
  });
  return conds;
};
