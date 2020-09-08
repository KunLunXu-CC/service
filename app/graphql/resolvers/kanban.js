const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    kanbans: async (parents, args, context, info) => {
      return await getList({ model: 'Kanban', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createKanbans: async (parents, args, context, info) => {
      return await create({ model: 'Kanban', ...args, ctx: context.ctx });
    },
    removeKanbans: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Kanban',
        unique: 'name',
        ctx: context.ctx,
      });
    },
    updateKanbans: async (parents, args, context, info) => {
      return await update({ model: 'Kanban', ...args, ctx: context.ctx });
    },
  }
};
