const tagsWithArticles = require('../../service/tag/tagsWithArticles');
const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    tags: async (parents, args, context, info) => {
      return await getList({ model: 'Tag', ...args, ctx: context.ctx });
    },
    tagsWithArticles: async (parents, args, context, info) => {
      return await tagsWithArticles({ ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createTags: async (parents, args, context, info) => {
      return await create({ model: 'Tag', ...args, ctx: context.ctx });
    },
    removeTags: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Tag',
        unique: 'name',
        ctx: context.ctx,
      });
    },
    updateTags: async (parents, args, context, info) => {
      return await update({ model: 'Tag', ...args, ctx: context.ctx });
    },
  },
};
