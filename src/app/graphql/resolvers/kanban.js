const { getList, create, remove, update } = require('../../service/common');

module.exports = {
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
