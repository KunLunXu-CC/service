import { getList, create, remove, update } from '../../../service/common/index.mjs';

export default {
  Query: {
    kanbanTasks: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: 'KanbanTask',
    }),
  },

  Mutation: {
    createKanbanTasks: async (parents, args, context) => await create({
      ...args,
      ctx: context.ctx,
      model: 'KanbanTask',
    }),

    removeKanbanTasks: async (parents, args, context) => await remove({
      ...args,
      ctx: context.ctx,
      model: 'KanbanTask',
    }),

    updateKanbanTasks: async (parents, args, context) => await update({
      ...args,
      ctx: context.ctx,
      model: 'KanbanTask',
    }),
  },
};
