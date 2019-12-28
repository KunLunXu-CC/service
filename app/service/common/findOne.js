const { RESCODE } = require('../../../config/consts');
const getConditions = require('../../../utils/getConditions');

/**
 * 通用获取单条数据方法
 * @param {String}  model   模型名称
 * @param {Object}  ctx     koa上下文
 * @param {Object}  search  查询参数
 */
module.exports = async ({ model, ctx, search }) => {
  const data = {
    data: {},
    rescode: RESCODE.SUCCESS,
    message: '创建成功',
  };
  const server = ctx.db.mongo[model];
  const conds = getConditions(search);
  try {
    data.data = await server.findOne(conds);
  } catch (e) {
    data.message = '请求失败';
    data.rescode = RESCODE.FAIL;
  }
  return data;
}
