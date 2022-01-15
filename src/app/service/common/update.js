import mongoose from 'mongoose';
import getList from '#service/common/getList';
import getConditions from '#utils/getConditions';

/**
 * 通用修改方法
 * @param {String}  model         模型名称
 * @param {Object}  ctx           koa上下文
 * @param {Object}  conds         要更新数据的查询条件
 * @param {Object}  body          创建信息
 * @param {Object}  search        查询参数
 * @param {Object}  pagination    分页信息
 * @param {Object}  orderBy       排序
 */
export default async ({
  model,
  ctx,
  conds,
  body,
  search,
  orderBy,
  pagination,
}) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '修改成功',
  };
  const server = mongoose.model(model);
  const changeConds = getConditions(conds);
  let changeIds = [];

  try {
    body.updateTime = Date.now();
    body.updater = ctx.state.user.id,
    changeIds = (await server.find(changeConds)).map((v) => v._id);
    await server.updateMany(changeConds, body, {});
  } catch (e) {
    data.message = '修改失败';
  }

  if (search) {
    const listData = await getList({ model, ctx, search, pagination, orderBy });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }

  data.change = await server.find({ _id: { $in: changeIds } });
  return data;
};