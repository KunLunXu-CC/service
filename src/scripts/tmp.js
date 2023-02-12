// 临时脚本
import mongoose from 'mongoose';
import { importFiles } from '#utils/fs';
import { BOOLEAN } from '#src/config/consts';

export default {
  name: '临时脚本',
  exec: async () => {
    // 1. 读取表, 并选择要清除的表
    const files = await importFiles({
      dir: new URL('../mongo/models', import.meta.url).pathname,
    });

    // 2. 添加 isDelete 字段
    for (const { fileName } of files) {
      await mongoose.model(fileName).updateMany({}, {
        isDelete: BOOLEAN.FALSE,
      }, {});
    }
  },
};
