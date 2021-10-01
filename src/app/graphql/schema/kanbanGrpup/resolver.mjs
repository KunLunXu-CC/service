import { getList, create, remove, update } from '../../../service/common/index.mjs';

export default {
  Query: {
    kanbanGroups: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: 'KanbanGroup',
    }),
  },

  Mutation: {
    createKanbanGroups: async (parents, args, context) => await create({
      ...args,
      ctx: context.ctx,
      model: 'KanbanGroup',
    }),

    removeKanbanGroups: async (parents, args, context) => await remove({
      ...args,
      ctx: context.ctx,
      model: 'KanbanGroup',
    }),

    updateKanbanGroups: async (parents, args, context) => await update({
      ...args,
      ctx: context.ctx,
      model: 'KanbanGroup',
    }),
  },
};
