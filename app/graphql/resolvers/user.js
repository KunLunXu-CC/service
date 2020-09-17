const { getList, create, remove, update  } = require('../../service/common');
const { login } = require('../../service/user');

module.exports = {
  Query: {
    users: async (parents, args, context, info) => {
      return await getList({ model: 'User', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createUsers: async (parents, args, context, info) => {
      return await create({ model: 'User', ...args, ctx: context.ctx });
    },
    removeUsers: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'User',
        unique: 'name',
        ctx: context.ctx,
      });
    },
    updateUsers: async (parents, args, context, info) => {
      return await update({ model: 'User', ...args, ctx: context.ctx });
    },
    login: async (parents, args, context, info) => {
      return await login({ ...args, ctx: context.ctx });
    }
  },
}
