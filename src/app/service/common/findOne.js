import mongoose from 'mongoose';
import getConditions from '#utils/getConditions';

/**
 * 通用获取单条数据方法
 * @param {String}  model   模型名称
 * @param {Object}  search  查询参数
 */
export default async ({ model, search }) => {
  const data = {
    data: {},
    message: '创建成功',
  };
  const server = mongoose.model(model);
  const conds = getConditions(search);

  try {
    data.data = await server.findOne(conds);
  } catch (e) {
    data.message = '请求失败';
  }

  return data;
};
