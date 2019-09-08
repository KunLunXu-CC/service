const { RESCODE } = require('../../../config/conts');
const getConditions = require('../../../utils/getConditions');
const getList = require('./getList');
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
module.exports = async ({ model, ctx, conds, body, orderBy, search, pagination }) => {
  const data = { 
    list: [],
    change: [],
    pagination: {}, 
    message: '修改成功', 
    rescode: RESCODE.SUCCESS, 
  };
  const server = ctx.db.mongo[model];
  const changeConds = getConditions(conds);
  let changeIds = [];
  try {
    body.updater = null;
    body.updateTime = Date.now();
    changeIds = (await server.find(changeConds)).map(v => v._id);
    await server.updateMany(changeConds, body, {});
  } catch (e) {
    data.message = '修改失败';
    data.message = RESCODE.FAIL;
  }
  if (search){
    const listData = await getList({ model, ctx, search, pagination, orderBy });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }
  data.change = await server.find({_id: {$in: changeIds}});
  return data;
}
