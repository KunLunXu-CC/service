import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    linkHubs: async (parents, args, context) => {
      const { list, pagination } = await getList({
        ...args,
        model: 'LinkHub',
        ctx: context.ctx,
      });
      return {
        list,
        pagination,
      };
    },

  },

  Mutation: {
    removeLinkHub: async (parents, args, context) => await remove({
      ...args,
      model: 'LinkHub',
      ctx: context.ctx,
    }),

    createLinkHub: async (parents, args, context) => await create({
      ...args,
      model: 'LinkHub',
      ctx: context.ctx,
    }),

    updateLinkHub: async (parents, args, context) => await update({
      ...args,
      model: 'LinkHub',
      ctx: context.ctx,
    }),
  },
};
