const { getList, create, remove, update  } = require('../../service/common');
const { login } = require('../../service/user');

module.exports = {
  Query: {
    users: async (parents, args, context) => await getList({
      ...args,
      model: 'User',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createUsers: async (parents, args, context) => await create({
      ...args,
      model: 'User',
      ctx: context.ctx,
    }),

    removeUsers: async (parents, args, context) => await remove({
      ...args,
      model: 'User',
      unique: 'name',
      ctx: context.ctx,
    }),

    updateUsers: async (parents, args, context) => await update({
      ...args,
      model: 'User',
      ctx: context.ctx,
    }),

    login: async (parents, args, context) => await login({
      ...args,
      ctx: context.ctx,
    }),
  },
};
