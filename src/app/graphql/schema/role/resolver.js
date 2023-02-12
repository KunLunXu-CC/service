import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

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
      ctx: context.ctx,
    }),

    updateRoles: async (parents, args, context) => await update({
      ...args,
      model: 'Role',
      ctx: context.ctx,
    }),
  },
};
