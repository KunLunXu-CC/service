const getConditions = require('../../../utils/getConditions');
const _ = require('lodash');

/**
 * 通用获取数据列表方法
 * @param {String}  model         模型名称
 * @param {Object}  ctx           koa上下文
 * @param {Object}  search        查询参数
 * @param {Object}  pagination    分页参数
 * @param {Object}  orderBy       排序
 */
module.exports = async ({ model, ctx, search, pagination, orderBy }) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '请求成功',
  };
  const server = ctx.db.mongo[model];
  const conds = getConditions(search);
  data.pagination = {
    ...pagination,
    total: await server.find(conds).count()
  };

  try {
    const sort = orderBy || {};
    if (pagination){
      const limit = pagination.pageSize;
      const skip = ( pagination.current - 1 ) * pagination.pageSize;
      data.list = await server.find(conds).skip(skip).limit(limit).sort(sort);
    } else {
      data.list = await server.find(conds).sort(sort);
    }
  } catch (e) {
    data.message = '请求失败';
  }
  return data;
}
