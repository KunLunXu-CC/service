import mongoose from 'mongoose';
import getList from '#service/common/getList';
import getConditions from '#utils/getConditions';

/**
 * 通用删除（假删）方法
 *
 * @param {string} model       模型名称
 * @param {object} ctx          koa 上下文
 * @param {object} conds        要删除数据的查询条件
 * @param {object} search       查询参数
 * @param {object} pagination   分页信息
 * @param {object} orderBy      排序
 * @param {string}  unique      唯一值字段名, 如果设置了将修改该字段值
 */
export default async ({
  ctx,
  conds,
  model,
  search,
  unique,
  orderBy,
  pagination,
}) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '删除成功',
  };
  const server = mongoose.model(model);
  const changeConds = getConditions(conds);
  let changeIds = [];

  try {
    changeIds = (await server.find(changeConds)).map((v) => v._id);
    await server.updateMany(changeConds, {
      updater: ctx.state.user.id,
      // status: STATUS.DELETE,
    });
  } catch (e) {
    data.message = '删除失败';
  }

  data.change = await server.find({ _id: { $in: changeIds } });

  if (unique) {
    for (const item of data.change) {
      await server.updateMany(
        { _id: item.id },
        { [unique]: `${item[unique]}_${item.id}` },
      );
    }
  }

  if (search) {
    const listData = await getList({ model, ctx, search, orderBy, pagination });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }

  return data;
};
