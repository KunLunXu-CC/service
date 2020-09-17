const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    kanbanTasks: async (parents, args, context, info) => {
      return await getList({ model: 'KanbanTask', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createKanbanTasks: async (parents, args, context, info) => {
      return await create({ model: 'KanbanTask', ...args, ctx: context.ctx });
    },
    removeKanbanTasks: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'KanbanTask',
        ctx: context.ctx,
      });
    },
    updateKanbanTasks: async (parents, args, context, info) => {
      return await update({ model: 'KanbanTask', ...args, ctx: context.ctx });
    },
  },
};
