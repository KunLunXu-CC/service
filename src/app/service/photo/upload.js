import * as oss from '#utils/oss';
import create from '#service/common/create';

/**
 * 上传文件至 oss
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
    resList.push({
      fileName: res.name, // 处理后, 上传到 oss 的名字
      sourceFileName: fileName, // 上传时的文件名
      originFileName: res.originFileName, // 源文件上传到 oss 的名字
    });
  }

  return resList;
};

// TODO: 目前没考虑传非图片的情况, 也没文件类型做校验
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
      originFileName: v.originFileName,
    })),
  });
};
