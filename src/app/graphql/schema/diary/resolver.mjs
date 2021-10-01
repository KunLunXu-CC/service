import statsBill from '../../../service/diary/statsBill.mjs';
import { getList, create, remove, update } from '../../../service/common/index.mjs';

export default {
  Query: {
    diaries: async (parents, args, context) => await getList({
      ...args,
      model: 'Diary',
      ctx: context.ctx,
    }),

    statsBill: async (parents, args, context) => await statsBill({
      ...args,
      ctx: context.ctx,
    }),
  },
  Mutation: {
    createDiaries: async (parents, args, context) => await create({
      ...args,
      model: 'Diary',
      ctx: context.ctx,
    }),

    removeDiaries: async (parents, args, context) => await remove({
      ...args,
      model: 'Diary',
      unique: 'name',
      ctx: context.ctx,
    }),

    updateDiaries: async (parents, args, context) => await update({
      ...args,
      model: 'Diary',
      ctx: context.ctx,
    }),
  },
};
