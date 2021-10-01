import fs from 'fs';
import path from 'path';

/**
 * 读取给定文件夹下所有文件并返回文件路径列表(递归所有目录)
 * @param {String} dir 指定目录路径
 */
export const readFileList = (dir) => {
  const isDirectory = fs.statSync(dir)?.isDirectory();
  return isDirectory
    ? fs.readdirSync(dir).reduce((total, file) => ([
      ...total,
      ...readFileList(path.join(dir?.pathname ?? dir, file)),
    ]), [])
    : [dir];
};

//  ignoredExtensions?: string[];
//     extensions?: string[];
//     useRequire?: boolean;
//     requireMethod?: any;
//     globOptions?: GlobbyOptions;
//     exportNames?: string[];
//     recursive?: boolean;
//     ignoreIndex?: boolean;
//     extractExports?: (fileExport: any) => any;
/**
 * 加载指定目录路径下的所有指定后缀文件
 * @param {String} dir                  指定目录路径
 * @param {String[]} extensions              指定文件后缀, 默认为 .mjs
 * @param {Function} filter             忽略文件, 同 Array.filter 返回 true 则保留: file => boolean
 * @param {Array}  handler              返回对象每个值的处理方法, 默认是使用 import 加载文件
 * @return {Object} { [fileName]: Object }
 */
export const importFiles = async ({
  dir,
  filter = (file) => file,
}) => {
  const files = readFileList(dir).filter(filter);

  console.log('%c [ files ]', 'font-size:13px; background:pink; color:#bf2c9f;', files);
  // for (const file of files) {
  //   const ignore = ignores.includes(file);

  //   if (!ignore && path.extname(file) === extname) {
  //     res[path.basename(file).split('.')[0]] = handler
  //       ? await handler(file)
  //       : await import(file);
  //   }

  //   console.log('%c [ res1 ]', 'font-size:13px; background:pink; color:#bf2c9f;', res, file);
  // }

  // for (let i = 0; i < files.length; i += 1) {
  //   console.log('[ i ]', i);
  //   await import(files[i]);
  // }
};

/**
 * 判读路径是否存在, 如不存在则按照层级创建文件夹
 * @param {URL | String} pathStr 绝对路径
 * @return projectPath 返回绝对路径
 */
export const mkdirPath = (pathStr) => {
  const tempDirArray = (pathStr?.pathname ?? pathStr).split('/').filter((v) => v);
  let tempDir = '';

  for (const item of tempDirArray) {
    tempDir += `/${item}`;

    try {
      !fs.readdirSync(tempDir) &&
      new Error('目录不存在!');
    } catch (e) {
      fs.mkdirSync(tempDir);
    }
  }

  return pathStr;
};
