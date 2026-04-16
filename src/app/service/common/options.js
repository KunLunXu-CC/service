import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';
import { getScopeConds } from '#src/utils/getConditions';

/**
 * 通用获取下拉项 options 方法
 *
 * @param {object} params             参数
 * @param {object} params.ctx         koa 上下文
 * @param {string} params.model       模型名称
 * @param {object} params.search      查询参数，支持 include/name/filter
 * @param {object} params.pagination  查询页数
 */
export default async ({
  ctx,
  model,
  search = {},
  pagination = {},
}) => {
  const defautPageSize = 10;
  const server = mongoose.model(model);
  const { include = [], name = '', filter = [] } = search;

  // 查询参数处理
  const limit = (
    (pagination.current || 1) * (pagination.pageSize || defautPageSize)
  ) - include.length;

  const conds = {
    name: { $regex: name },
    isDelete: BOOLEAN.FALSE,
    $or: [...getScopeConds({ ctx })],
  };

  pagination.total = await server.find(conds).countDocuments();

  // 查询( 基础数据、必要数据 )
  const baseList = await server.find({
    ...conds,
    _id: { $nin: [...include, ...filter] },
  }).limit(limit);
  const requiredList = await server.find({
    ...conds,
    _id: { $in: include },
  });

  return { list: [...baseList, ...requiredList], pagination };
};
