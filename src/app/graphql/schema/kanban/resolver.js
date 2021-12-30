import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    kanbans: async (parents, args, context) => await getList({
      ...args,
      model: 'Kanban',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createKanbans: async (parents, args, context) => await create({
      ...args,
      model: 'Kanban',
      ctx: context.ctx,
    }),

    removeKanbans: async (parents, args, context) => await remove({
      ...args,
      unique: 'name',
      model: 'Kanban',
      ctx: context.ctx,
    }),

    updateKanbans: async (parents, args, context) => await update({
      ...args,
      model: 'Kanban',
      ctx: context.ctx,
    }),
  },
};
