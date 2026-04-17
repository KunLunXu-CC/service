import mongoose from 'mongoose';
import { DATA_SCOPE } from '#config/constants';

const EMPTY_SCOPE_CONDS = {
  $or: [
    { scope: { $exists: false } },
    { scope: null },
    { scope: '' },
  ],
};

const SCOPES = [
  { model: 'AiChat', scope: DATA_SCOPE.USER },
  { model: 'Algorithm', scope: DATA_SCOPE.USER },
  { model: 'Article', scope: DATA_SCOPE.USER },
  { model: 'Diary', scope: DATA_SCOPE.USER },
  { model: 'Folder', scope: DATA_SCOPE.USER },
  { model: 'Interview', scope: DATA_SCOPE.USER },
  { model: 'Kanban', scope: DATA_SCOPE.USER },
  { model: 'KanbanGroup', scope: DATA_SCOPE.USER },
  { model: 'KanbanTask', scope: DATA_SCOPE.USER },
  { model: 'LinkHub', scope: DATA_SCOPE.USER },
  { model: 'Photo', scope: DATA_SCOPE.USER },
  { model: 'Snippet', scope: DATA_SCOPE.USER },
  { model: 'Tag', scope: DATA_SCOPE.USER },
  { model: 'UserConfig', scope: DATA_SCOPE.USER },
  { model: 'Wallpaper', scope: DATA_SCOPE.USER },
  { model: 'Role', scope: DATA_SCOPE.ADMIN },
  { model: 'User', scope: DATA_SCOPE.ADMIN },
];

export default {
  needMongo: true,
  name: '补齐历史数据 scope',
  exec: async () => {
    const results = [];

    for (const { model, scope } of SCOPES) {
      const Model = mongoose.model(model);
      const total = await Model.countDocuments(EMPTY_SCOPE_CONDS);
      const { modifiedCount } = await Model.updateMany(
        EMPTY_SCOPE_CONDS,
        { $set: { scope } },
      );

      results.push({
        model,
        scope,
        total,
        modifiedCount,
      });
    }

    console.table(results);
  },
};
