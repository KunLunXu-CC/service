// 临时脚本
const mongoose = require('mongoose');


module.exports = {
  name: '临时',
  exec: async () => {
    const a = mongoose.model('User');
    console.log('[ a ]', a, mongoose.models);
  },
};
