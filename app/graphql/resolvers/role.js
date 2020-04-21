const { getList, create, remove, update, findOne  } = require('../../service/common');

module.exports = {
  Query: {
    roles: async (parents, args, context, info) => {
      return await getList({ model: 'Role', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createRoles: async (parents, args, context, info) => {
      return await create({ model: 'Role', ...args, ctx: context.ctx });
    },
    removeRoles: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Role',
        unique: 'name',
        ctx: context.ctx,
      });
    },
    updateRoles: async (parents, args, context, info) => {
      return await update({ model: 'Role', ...args, ctx: context.ctx });
    },
  },
}
