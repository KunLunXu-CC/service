// 临时脚本
import { DATA_SCOPE, WALLPAPER_CATEGORY } from '#src/config/constants';
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
  {
    name: '岛屿',
    description: 'macos 壁纸',
    sourceFileName: 'klx.pro.2ff30568a25a63ad17c157d26a24b670.jpg',
    category: WALLPAPER_CATEGORY.MACOS,
    sort: 0,
    scope: DATA_SCOPE.COMMON,
  },
  {
    name: '默认',
    description: 'macos 壁纸',
    sourceFileName: 'klx.pro.94ec66efd3afe1fcc005fa8d88451ec5.jpg',
    category: WALLPAPER_CATEGORY.MACOS,
    sort: 1,
    scope: DATA_SCOPE.COMMON,
  },
  {
    name: '日落金山',
    description: 'macos 壁纸',
    sourceFileName: 'klx.pro.94c4354f153b2eb3914d07a6a2b39da4.jpg',
    category: WALLPAPER_CATEGORY.MACOS,
    sort: 2,
    scope: DATA_SCOPE.COMMON,
  },
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
