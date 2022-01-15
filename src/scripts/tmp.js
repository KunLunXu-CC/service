// 临时脚本
import mongoose from 'mongoose';

export default {
  name: '临时',
  exec: async () => {
    const a = mongoose.model('User');
    console.log('[ a ]', a, mongoose.models);
  },
};
