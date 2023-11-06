import mongoose from 'mongoose';
import getList from '#service/common/getList';
import getConditions from '#utils/getConditions';

/**
 * 通用修改方法
 *
 * @param {object}  params               参数
 * @param {string}  params.model         模型名称
 * @param {object}  params.ctx           koa上下文
 * @param {object}  params.conds         要更新数据的查询条件
 * @param {object}  params.body          创建信息
 * @param {object}  params.search        查询参数
 * @param {object}  params.pagination    分页信息
 * @param {object}  params.orderBy       排序
 * @param {boolean} params.astrictUser   限制用户(只允许创建者, 修改自己的数据)
 */
export default async ({
  model,
  ctx,
  conds,
  body,
  search,
  orderBy,
  pagination,
  astrictUser,
}) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '修改成功',
  };

  const handledConds = { ...conds };

  if (astrictUser) {
    handledConds.creator = ctx.state.user.id;
  }

  const server = mongoose.model(model);
  const changeConds = getConditions(handledConds);
  let changeIds = [];

  try {
    body.updateTime = Date.now();
    body.updater = ctx?.state.user.id,
    changeIds = (await server.find(changeConds)).map((v) => v._id);
    await server.updateMany(changeConds, body, {});
  } catch (e) {
    data.message = '修改失败';
  }

  if (search) {
    const listData = await getList({
      ctx,
      model,
      search,
      orderBy,
      pagination,
      astrictUser,
    });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }

  data.change = await server.find({ _id: { $in: changeIds } });
  return data;
};
