import { getList, create, remove, update } from '../../../service/common/index.mjs';

export default {
  Query: {
    roles: async (parents, args, context) => await getList({
      ...args,
      model: 'Role',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createRoles: async (parents, args, context) => await create({
      ...args,
      model: 'Role',
      ctx: context.ctx,
    }),

    removeRoles: async (parents, args, context) => await remove({
      ...args,
      model: 'Role',
      unique: 'name',
      ctx: context.ctx,
    }),

    updateRoles: async (parents, args, context) => await update({
      ...args,
      model: 'Role',
      ctx: context.ctx,
    }),
  },
};
