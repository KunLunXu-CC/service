import mongoose from 'mongoose';
import getList from '#service/common/getList';
import getConditions from '#utils/getConditions';

/**
 * 通用删除（假删）方法
 *
 * @param {object}  params             参数
 * @param {string}  params.model       模型名称
 * @param {object}  params.ctx          koa 上下文
 * @param {object}  params.conds        要删除数据的查询条件
 * @param {object}  params.search       查询参数
 * @param {object}  params.pagination   分页信息
 * @param {object}  params.orderBy      排序
 */
export default async ({
  ctx,
  conds,
  model,
  search,
  orderBy,
  pagination,
}) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '删除成功',
  };

  const handledConds = { ...conds };

  const server = mongoose.model(model);
  const changeConds = getConditions(handledConds);
  let changeIds = [];

  try {
    changeIds = (await server.find(changeConds)).map((v) => v._id);

    // 假删
    for (const _id of changeIds) {
      await server.updateMany({ _id }, {
        updater: ctx.state.user.id,
        isDelete: _id,
      });
    }
  } catch (e) {
    data.message = '删除失败';
  }

  data.change = await server.find({ _id: { $in: changeIds } });

  if (search) {
    const listData = await getList({
      ctx,
      model,
      search,
      orderBy,
      pagination,
    });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }

  return data;
};
