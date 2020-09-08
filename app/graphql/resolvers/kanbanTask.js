const { findOne, getList, create, remove, update } = require('../../service/common');

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

  KanbanTask: {
    kanban: async (parents, args, context, info) => {
      if (parents.kanban){
        const data = await findOne({
          model: 'Kanban',
          ctx: context.ctx,
          search: { id: parents.kanban }
        });
        return data.data || {};
      } else {
        return {};
      }
    },
    group: async (parents, args, context, info) => {
      if (parents.group){
        const data = await findOne({
          model: 'KanbanGroup',
          ctx: context.ctx,
          search: { id: parents.group }
        });
        return data.data || {};
      } else {
        return {};
      }
    },
  },
};
