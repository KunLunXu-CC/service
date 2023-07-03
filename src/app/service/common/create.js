import logger from '#logger';
import mongoose from 'mongoose';
import getList from '#service/common/getList';

/**
 * 通用创建数据方法
 *
 * @param {object}  params               参数
 * @param {string}  params.model         模型名称
 * @param {object}  params.ctx           koa上下文
 * @param {Array}   params.body          创建信息
 * @param {object}  params.search        查询参数
 * @param {object}  params.pagination    分页参数
 * @param {object}  params.orderBy       排序
 */
export default async ({ model, ctx, body, search, orderBy, pagination }) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '创建成功',
  };
  const server = mongoose.model(model);

  try {
    data.change = await server.insertMany(body.map((v) => ({
      ...v,
      creator: ctx?.state.user.id,
      updater: ctx?.state.user.id,
    })));
  } catch (message) {
    logger({ ctx, level: 'error', label: '新增数据', message });
    data.message = '创建失败';
  }

  if (search) {
    const listData = await getList({ model, ctx, search, orderBy, pagination });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }

  return data;
};
