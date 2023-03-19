import ora from 'ora';
import _ from 'lodash';
import chalk from 'chalk';
import inquirer from 'inquirer';
import mongoose from 'mongoose';
import { BOOLEAN } from '#config/constants';

export default {
  name: '为角色添加应用(权限)',
  exec: async () => {
    // 1. 交互式命令获取参数
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
        default: false,
        type: 'confirm',
        name: 'writable',
        message: '是否可写?',
      },
    ]);

    // 2. 查询对应角色信息
    const { id, auth } = await mongoose.model('Role').findOne({ name }) ?? {};

    // 3. 空值处理
    if (!id) {
      ora().fail(chalk.red('未找到当前角色!\n'));
      return false;
    }

    // 4. 计算新的权限
    const newAuth = _.uniqBy([
      ...auth.map((v) => v),
      {
        code,
        readable: BOOLEAN.TRUE,
        writable: writable ? BOOLEAN.TRUE : BOOLEAN.FALSE,
      },
    ], 'code');

    // 5. 更新角色权限
    await mongoose.model('Role').updateMany(
      { _id: id },
      { auth: newAuth },
    );

    ora().succeed(chalk.green('添加成功!\n'));
  },
};
