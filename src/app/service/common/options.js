import mongoose from 'mongoose';
import { STATUS } from '#config/consts';

/**
 * 通用获取下拉项 options 方法
 *
 * @param {string} model            模型名称
 * @param {object} search           查询参数
 * @param {object} pagination       查询页数
 * @param {object} search.include   查询参数:必须包含项（id数组）
 * @param {object} search.name      查询参数(通过 name 进行模糊匹配)
 * @param {object} search.filter    查询参数：过滤项（id 数组）
 */
export default async ({ model, pagination = {}, search = {} }) => {
  const defautPageSize = 10;
  const server = mongoose.model(model);
  const { include = [], name = '', filter = [] } = search;

  // 查询参数处理
  const limit = (
    (pagination.current || 1) * (pagination.pageSize || defautPageSize)
  ) - include.length;

  const conds = {
    name: { $regex: name },
    status: { $ne: STATUS.DELETE },
  };

  pagination.total = await server.find(conds).estimatedDocumentCount();

  // 查询( 基础数据、必要数据 )
  const baseList = await server.find({
    ...conds,
    _id: { $nin: [...include, ...filter] },
  }).limit(limit);
  const requiredList = await server.find({ _id: { $in: include } });

  return { list: [...baseList, ...requiredList], pagination };
};
