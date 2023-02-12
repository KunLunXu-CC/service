import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';
import tagsWithArticles from '#service/tag/tagsWithArticles';

export default {
  Query: {
    tags: async (parents, args, context) => await getList({
      ...args,
      model: 'Tag',
      ctx: context.ctx,
    }),

    tagsWithArticles: async (parents, args, context) => await tagsWithArticles({
      ...args,
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createTags: async (parents, args, context) => await create({
      ...args,
      model: 'Tag',
      ctx: context.ctx,
    }),

    removeTags: async (parents, args, context) => await remove({
      ...args,
      model: 'Tag',
      ctx: context.ctx,
    }),

    updateTags: async (parents, args, context) => await update({
      ...args,
      model: 'Tag',
      ctx: context.ctx,
    }),
  },
};
