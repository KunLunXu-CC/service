import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
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
