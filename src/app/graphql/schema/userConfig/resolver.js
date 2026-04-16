import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import findOne from '#service/common/findOne';
import getList from '#service/common/getList';

const MODEL = 'UserConfig';

export default {
  Query: {
    userConfigs: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: MODEL,
      astrictUser: true,
    }),

    userConfig: async (parents, args, context) => await findOne({
      ctx: context.ctx,
      model: MODEL,
      search: args,
      astrictUser: true,
    }),
  },

  Mutation: {
    createUserConfigs: async (parents, args, context) => await create({
      ...args,
      model: MODEL,
      ctx: context.ctx,
      astrictUser: true,
    }),

    removeUserConfigs: async (parents, args, context) => await remove({
      ...args,
      model: MODEL,
      ctx: context.ctx,
      astrictUser: true,
    }),

    updateUserConfigs: async (parents, args, context) => await update({
      ...args,
      model: MODEL,
      ctx: context.ctx,
      astrictUser: true,
      upsert: true,  // 如果没有找到就创建
    }),
  },
};
