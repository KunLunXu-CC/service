import mongoose from 'mongoose';
import getConditions, { getScopeConds } from '#utils/getConditions';

/**
 * 通用获取单条数据方法
 *
 * @param {object} params 请求参数
 * @param {string}  params.model         模型名称
 * @param {object}  params.search        查询参数
 * @param {object}  params.ctx           koa 上下文
 */
export default async ({ model, search, ctx }) => {
  const data = {
    data: {},
    message: '请求成功',
  };

  const handledSearch = {
    ...search,
    $or: [...getScopeConds({ ctx })],
  };

  const server = mongoose.model(model);
  const conds = getConditions(handledSearch);

  try {
    data.data = await server.findOne(conds);
  } catch (e) {
    data.message = '请求失败';
  }

  return data;
};
