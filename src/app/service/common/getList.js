import mongoose from 'mongoose';
import getConditions from '#utils/getConditions';

/**
 * 通用获取数据列表方法
 * @param {String}  model         模型名称
 * @param {Object}  search        查询参数
 * @param {Object}  pagination    分页参数
 * @param {Object}  orderBy       排序
 */
export default async ({ model, search, pagination, orderBy }) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '请求成功',
  };
  const server = mongoose.model(model);
  const conds = getConditions(search);
  data.pagination = {
    ...pagination,
    total: await server.find(conds).countDocuments(),
  };

  try {
    const sort = orderBy || {};

    if (pagination) {
      const limit = pagination.pageSize;
      const skip = (pagination.current - 1) * pagination.pageSize;
      data.list = await server.find(conds).skip(skip)
        .limit(limit)
        .sort(sort);
    } else {
      data.list = await server.find(conds).sort(sort);
    }
  } catch (e) {
    data.message = '请求失败';
  }

  return data;
};