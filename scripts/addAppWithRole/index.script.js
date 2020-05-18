// 临时脚本
const _ = require('lodash');
const inquirer = require('inquirer');
const mongo = require('../../utils/mongo');
const { BOOLEAN } = require('../../config/consts');

module.exports = {
  exec: async () => {
    const { name, code } = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        default: 'admin',
        message: '角色名',
      },
      {
        name: 'code',
        type: 'input',
        message: '应用编码',
      },
    ]);
    const db = mongo();
    const role = await db.Role.findOne({ name });
    role && await db.Role.updateMany(
      { _id: role.id },
      { auth: _.uniqBy([
          ... role.auth.map(v => v),
          {
            code,
            readable: BOOLEAN.TRUE,
            writable: BOOLEAN.TRUE,
          }
        ], 'code')
      }
    );
  },
  name: '为角色添加应用',
};
