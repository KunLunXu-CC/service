const _ = require('lodash');
const path = require('path');
const colors = require('colors');
const mongo = require('../../utils/mongo');

const { ROLE_TYPE } = require('../../config/consts');

const script = async () => {
  console.log(colors.green(`\n----- 脚本开始 -----\n`));

  // 1. 连接数据库
  let mongoDB = mongo();
  const model = 'Role';

  try {
    await mongoDB[model].updateMany({ name: 'tourist' }, {
      type: ROLE_TYPE.TOURIST,
    }, {});
    console.log(colors.green(`\n----- 脚本执行成功：角色为 tourist 的数据添加 type 值: ${ROLE_TYPE.TOURIST} -----\n`));

    await mongoDB[model].updateMany({ name: 'admin' }, {
      type: ROLE_TYPE.ADMIN,
    }, {});
    console.log(colors.green(`\n----- 脚本执行成功：角色为 admin 的数据添加 type 值: ${ROLE_TYPE.ADMIN} -----\n`));
  } catch(e){
    console.log(colors.green(`\n----- 脚本执行失败 -----\n`));
  }

  console.log(colors.green(`\n----- 脚本结束 -----\n`));
}

script();

/**
 * 删除某个字段
 * db.url.update({},{$unset:{'content':''}},false, true)
 * db.User.update({},{$unset:{'address':''}},false, true)
 */
