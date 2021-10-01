// 临时脚本
const _ = require('lodash');
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const { BOOLEAN } = require('../../config/consts.mjs');

module.exports = {
  exec: async () => {
    const { name, code, writable } = await inquirer.prompt([
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
      {
        name: 'writable',
        type: 'confirm',
        message: '是否可写?',
        default: false,
      },
    ]);

    const role = await mongoose.model('Role').findOne({ name });
    role && await mongoose.model('Role').updateMany(
      { _id: role.id },
      { auth: _.uniqBy([
        ...role.auth.map((v) => v),
        {
          code,
          readable: BOOLEAN.TRUE,
          writable: writable ? BOOLEAN.TRUE : BOOLEAN.FALSE,
        },
      ], 'code'),
      },
    );
  },
  name: '为角色添加应用',
};
