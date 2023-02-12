import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';
import removeBypayload from '#service/photo/removeBypayload';

import { ARTICLE_STATUS } from '#config/consts';

export default {
  Query: {
    articles: async (parents, args, context) => await getList({
      ...args,
      model: 'Article',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createArticles: async (parents, args, context) => await create({
      ...args,
      model: 'Article',
      ctx: context.ctx,
    }),

    removeArticles: async (parents, args, context) => {
      const data = await remove({
        ...args,
        model: 'Article',
        ctx: context.ctx,
      });
      removeBypayload({
        ctx: context.ctx,
        payload: data.change.map((v) => v.id),
      });
      return data;
    },

    updateArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
    }),

    // 发布
    releaseArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      body: { status: ARTICLE_STATUS.RELEASE },
    }),

    // 撤销
    revokeArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      body: { status: ARTICLE_STATUS.SAVE },
    }),
  },
};
