const { getList, create, remove, update, findOne  } = require('../../service/common');
const { login } = require('../../service/user');

module.exports = {
  Query: {
    snippets: async (parents, args, context, info) => {
      return await getList({ model: 'Snippet', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createSnippets: async (parents, args, context, info) => {
      return await create({ model: 'Snippet', ...args, ctx: context.ctx });
    },
    removeSnippets: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Snippet',
        ctx: context.ctx,
      });
    },
    updateSnippets: async (parents, args, context, info) => {
      return await update({ model: 'Snippet', ...args, ctx: context.ctx });
    },
  },
}
