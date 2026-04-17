// 临时脚本
import mongoose from 'mongoose';

const WALLPAPERS = [
  // 把壁纸数组放这里:
  // {
  //   name: '壁纸名称',
  //   description: '描述',
  //   url: 'https://example.com/wallpaper.jpg',
  //   thumbnailUrl: 'https://example.com/wallpaper-thumb.jpg',
  //   category: 1,
  //   sort: 0,
  // },
];

export default {
  name: '批量配置壁纸',
  needMongo: true,
  exec: async () => {
    const User = mongoose.model('User');
    const Wallpaper = mongoose.model('Wallpaper');
    const admin = await User.findOne({ account: 'admin' });

    await Wallpaper.insertMany(WALLPAPERS.map((wallpaper) => ({
      ...wallpaper,
      creator: admin.id,
      updater: admin.id,
    })));
  },
};
