import _ from 'lodash';
import { getList } from '../common/index.mjs';

/**
 * 查询所有标签下具有文章的标签列表
 * @param {Object}  ctx           koa上下文
 * @param {Object}  search        查询参数
 * @param {Object}  pagination    分页参数
 * @param {Object}  orderBy       排序
 */
export default async ({ ctx, search, orderBy }) => {
  const { list } = await getList({ model: 'Article', search, ctx });

  const tags = _.uniq(
    list.reduce((total, curr) => {
      const currTags = (curr.tags || []).map((v) => _.toString(v));
      return [...total, ...currTags];
    }, []),
  );

  return await getList({
    ctx,
    orderBy,
    model: 'Tag',
    search: { ids: tags },
  });
};
