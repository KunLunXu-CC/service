import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import findOne from '#service/common/findOne';
import getList from '#service/common/getList';

const MODEL = 'UserSetting';

export default {
  Query: {
    userSettings: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: MODEL,
      astrictUser: true,
    }),

    userSetting: async (parents, args, context) => await findOne({
      ctx: context.ctx,
      model: MODEL,
      search: args,
      astrictUser: true,
    }),
  },

  Mutation: {
    createUserSettings: async (parents, args, context) => await create({
      ...args,
      model: MODEL,
      ctx: context.ctx,
    }),

    removeUserSettings: async (parents, args, context) => await remove({
      ...args,
      model: MODEL,
      ctx: context.ctx,
      astrictUser: true,
    }),

    updateUserSettings: async (parents, args, context) => await update({
      ...args,
      model: MODEL,
      ctx: context.ctx,
      astrictUser: true,
    }),
  },
};
