// 临时脚本
import _ from 'lodash';
import mongoose from 'mongoose';

export default {
  name: '临时',
  exec: async () => {
    // 修改 Article
    const article = mongoose.model('Article');

    const articles = await article.find();

    for (const item of articles) {
      const { id, tags } = item;

      if (tags?.[0]) {
        await article.updateMany(
          { _id: id },
          { folder: _.last(tags), tags: [] },
          {},
        );
      }
    }

    // 修改 datasetsfrom
    const datasetsfrom = mongoose.model('Datasetsfrom');
    const folder = mongoose.model('Folder');

    const datasetsfroms = await datasetsfrom.find({ code: 6 });

    // type name desc parent
    for (const item of datasetsfroms) {
      const { id, name, desc, parent } = item;

      await folder.insertMany(({
        _id: id,
        name,
        desc,
        parent,
      }));
    }
  },
};
