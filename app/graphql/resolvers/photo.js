const fs = require('fs');
const {getList, create, remove, update } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  // Query: {

  // },

  Mutation: {
    uploadPhotos: async (parents, args, context, info) => {
      console.log('\n\n\n\n\n=============>>> args', ...args);
      // args.body.files[0].then(res => {
      //   // console.log('\n\n\n\n\n\n\n\n\n\n===>>>', res.type, res.name, res);
      //   // const file = res; // 获取上传文件
      //   // console.log('\n\n\n\n\n\n\n\n===>>>>', res );

      //   // const reader = fs.createReadStream(res);
      //   // console.log('===>>>>', reader );
      // });
      
      // router.post('/upload', async (ctx){
      
      
      //  const reader = fs.createReadStream(); // 创建可读流

      //  const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`); // 创建可写流
      
      //  reader.pipe(upStream); // 可读流通过管道写入可写流
      
      //  return ctx.body = '上传成功';

      
      return {
        rescode: 666,
        message: '上传成功',
      };
    },
  },
  
  Photo: {
    creator, 
    updater,
  }
}
