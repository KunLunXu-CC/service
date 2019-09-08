const { STATUS, RESCODE } = require('../../../config/conts');
const getConditions = require('../../../utils/getConditions');
const getList = require('./getList');
const _ = require('lodash');

/**
 * 通用删除（假删）方法
 * @param {String}  model       模型名称
 * @param {Object} ctx          koa 上下文
 * @param {Object} conds        要删除数据的查询条件
 * @param {Object} search       查询参数
 * @param {Object} pagination   分页信息
 * @param {Object} orderBy      排序
 */
module.exports = async ({ model, ctx, conds, search, orderBy, pagination }) => {
  const data = { 
    list: [], 
    change: [],
    pagination: {}, 
    message: '删除成功', 
    rescode: RESCODE.SUCCESS, 
  };
  const server = ctx.db.mongo[model];
  const changeConds = getConditions(conds);
  let changeIds = [];
  try {
    changeIds = (await server.find(changeConds)).map(v => v._id);
    await server.updateMany(changeConds, { status: STATUS.DELETE });
  } catch (e) {
    data.message = '删除失败';
    data.rescode = RESCODE.FAIL;
  }

  if (search){
    const listData = await getList({ model, ctx, search, orderBy, pagination });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  } 
  data.change = await server.find({_id: {$in: changeIds}});
  return data;
}
