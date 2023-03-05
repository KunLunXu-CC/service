import * as oss from '#utils/oss';
import create from '#service/common/create';

/**
 * 上传文件至目标目录 app/static/images
 *
 * @param {object[]} files 前端上传文件列表
 * @returns {object[]} 文件上传结果列表
 */
const upPhotos = async (files) => {
  const resList = [];

  for (const file of files) {
    const { createReadStream, filename: fileName } = await file;
    const res = await oss.upload({
      fileName,
      fileStream: createReadStream(),
    });
    resList.push({ sourceFileName: fileName, fileName: res.name });
  }

  return resList;
};

export default async ({ body, ctx }) => {
  const { files, type, payload } = body;

  // 1. 遍历、上传文件
  const data = await upPhotos(files);

  // 2. 创建数据
  return await create({
    ctx,
    model: 'Photo',
    body: data.map((v) => ({
      type,
      payload,
      name: v.fileName,
      sourceFileName: v.sourceFileName,
    })),
  });
};
