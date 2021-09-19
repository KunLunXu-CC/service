const { getList, create, remove, update  } = require('../../service/common');

module.exports = {
  Query: {
    snippets: async (parents, args, context) => await getList({
      ...args,
      model: 'Snippet',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createSnippets: async (parents, args, context) => await create({
      ...args,
      model: 'Snippet',
      ctx: context.ctx,
    }),

    removeSnippets: async (parents, args, context) => await remove({
      ...args,
      model: 'Snippet',
      ctx: context.ctx,
    }),

    updateSnippets: async (parents, args, context) => await update({
      ...args,
      model: 'Snippet',
      ctx: context.ctx,
    }),
  },
};
