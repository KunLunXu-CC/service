// import create from '#service/common/create';
// import update from '#service/common/update';
// import getList from '#service/common/getList';
// import mongoose from 'mongoose';

// import { ROLE_TYPE, DEFAULT_ROLE_NAME } from '#config/constants';

// 临时脚本
export default {
  name: '临时脚本',
  exec: async () => {
    // // 1. 创建 normal 角色
    // await create({
    //   model: 'Role',
    //   body: [{
    //     auth: [],
    //     desc: '标准角色',
    //     name: DEFAULT_ROLE_NAME,
    //     type: ROLE_TYPE.NORMAL,
    //   }],
    // });

    // // 2. 修改 admin 数据
    // await update({
    //   model: 'User',
    //   conds: {
    //     account: 'admin',
    //   },
    //   body: {
    //     name: '墨渊君',
    //     githubId: '23526706',
    //     account: 'MoYuanJun',
    //     bio: '善战者无赫赫之功',
    //     avatar: 'https://avatars.githubusercontent.com/u/23526706?v=4',
    //   },
    // });

    // TODO 后面改成一个专门的脚本, 用于删除特定模块的无效数据(假删的数据)
    // 删除, 假删数据, isDelete === 0 表示删除没有被删除, 如果等于 id 则说明数据被删除了
    // const server = mongoose.model('Photo');
    // const preDelTotal = await server.find({
    //   isDelete: { $ne: 0 },
    // }).countDocuments();

    // const preTotal = await server.find().countDocuments();

    // const delRes = await server.deleteMany({ isDelete: { $ne: 0 } });
    // console.log('%c [ delRes ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', delRes);

    // const postDelTotal = await server.find({
    //   isDelete: { $ne: 0 },
    // }).countDocuments();
    // const postTotal = await server.find().countDocuments();
    // console.log(`文件数: ${preTotal} => ${postTotal}`);
    // console.log(`要删除的文件数: ${preDelTotal} => ${postDelTotal}`);
  },
};
