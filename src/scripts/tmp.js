// 临时脚本
import mongoose from 'mongoose';

export default {
  name: '临时',
  exec: async () => {
    const list = [];

    for (const name of list) {
      const server = mongoose.model(name);
      await server.remove({  });
    }
  },
};
