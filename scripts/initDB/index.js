const gulp = require('gulp');
const path = require('path');
const colors = require('colors');

const dbData = require('./db');
const mongo = require('../../utils/mongo');
const mongoDB = mongo(path.resolve(__dirname, '../../models'));

// 1. 脚本开始
const start = async () => {
  console.log(colors.green('\n----- 初始化脚本执行开始 -----\n'));
};

// 2. 脚本开始
const end = async () => {
  console.log(colors.green('\n----- 初始化脚本执行结束 -----\n'));
};

// 3. 初始化系统角色
const initRole = async () => {
  const model = 'Role';
  const data = dbData[model];
  console.log(colors.green(`\n----- 开始初始化 ${model} -----\n`));
  try {
    await mongoDB[model].remove({});
    await mongoDB[model].insertMany(data);
    console.log(colors.green(`\n----- 初始化数据完成 ${model} -----\n`));
  } catch(e){
    console.log(colors.green(`\n----- 初始化数据失败 ${model} -----\n`));
  }
};

// 4. 初始化系统用户
const initUser = async () => {
  const model = 'User';
  const data = dbData[model];
  console.log(colors.green(`\n----- 开始初始化 ${model} -----\n`));
  try {
    const roles = await mongoDB.Role.find({ name: { $in: data.map(v => v.role) } });
    data.forEach( item => (item.role = roles.find(v => v.name === item.role).id));
    await mongoDB[model].remove({});
    await mongoDB[model].insertMany(data);
    console.log(colors.green(`\n----- 初始化数据完成 ${model} -----\n`));
  } catch(e){
    console.log(colors.green(`\n----- 初始化数据失败 ${model} -----\n`));
  }
};

module.exports = gulp.series(
  start,
  initRole,
  initUser,
  end,
);
