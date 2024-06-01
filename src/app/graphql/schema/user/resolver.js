import login from '#service/user/login';
// import getUserInfo from '#service/user/getUserInfo';
import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    users: async (parents, args, context) => await getList({
      ...args,
      model: 'User',
      ctx: context.ctx,
    }),
    userInfo: async (parents, args, context) => ({
      message: '请求成功!',
      user: context.ctx.state.user,
    }),
  },

  Mutation: {
    // TODO: 创建用户需要对用户密码进行 MD5
    createUsers: async (parents, args, context) => await create({
      ...args,
      model: 'User',
      ctx: context.ctx,
    }),

    removeUsers: async (parents, args, context) => await remove({
      ...args,
      model: 'User',
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
