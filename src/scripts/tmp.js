// 临时脚本
import { readFileList } from '#utils/fs';

import fs from 'fs';
import OSS from 'ali-oss';
import tinify from '#utils/tinify';
import system from '#config/system';
const client = new OSS(system.oss);


export default {
  name: '临时脚本',
  exec: async () => {
    // 1. 读取表, 并选择要清除的表
    const files = readFileList(new URL('../app/static/images', import.meta.url).pathname);

    for (const file of files) {
      const res = file.split(/\/images\//ig);
      const stream = fs.createReadStream(file);
      const handledTinify = await tinify(stream); // 压缩
      await client.putStream(res[1], handledTinify.stream); // 上传
    }
  },
};
