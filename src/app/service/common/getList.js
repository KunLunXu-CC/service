import mongoose from 'mongoose';
import getConditions from '#utils/getConditions';

/**
 * 通用获取数据列表方法
 *
 * @param {object} params                参数
 * @param {string}  params.model         模型名称
 * @param {object}  params.search        查询参数
 * @param {object}  params.pagination    分页参数
 * @param {object}  params.orderBy       排序
 * @param {object}  params.ctx           koa 上下文
 * @param {boolean} params.astrictUser   限制用户(只返回当前用户的数据)
 */
export default async ({
  ctx,
  model,
  search,
  orderBy,
  pagination,
  astrictUser,
}) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '请求成功',
  };

  const handledSearch = { ...search };

  if (astrictUser) {
    handledSearch.creator = ctx.state.user.id;
  }

  const server = mongoose.model(model);
  const conds = getConditions(handledSearch);
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
