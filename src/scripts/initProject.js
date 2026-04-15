import fs from 'fs';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { createSecretKey } from './createSecretKey.js';
import { BOOLEAN, DEFAULT_ROLE_NAME, PHOTO_TYPE, ROLE_TYPE } from '#config/constants';
import { hash } from '#utils/encryption';
import { fileExists } from '#utils/fs';

const DEFAULT_PASSWORD = '123456';
const CONFIG_PATH = new URL('../config/system.js', import.meta.url);
const CONFIG_EXAMPLE_PATH = new URL('../config/system.example.js', import.meta.url);

/** 确保配置文件 */
const ensureConfig = () => {
  if (fileExists(CONFIG_PATH)) {
    console.log(chalk.gray('配置文件已存在，跳过: src/config/system.js'));
    return;
  }

  fs.copyFileSync(CONFIG_EXAMPLE_PATH, CONFIG_PATH);
  console.log(chalk.green('已创建配置文件: src/config/system.js'));
};

/** 连接 MongoDB */
const connectMongo = async () => {
  const { default: mongo } = await import('#mongo');
  await mongo();
};

/** 确保角色数据 */
const ensureRoles = async () => {
  const Role = mongoose.model('Role');
  const roles = await Role.create([
    {
      desc: '游客',
      name: 'tourist',
      type: ROLE_TYPE.TOURIST,
    },
    {
      desc: '普通角色',
      name: DEFAULT_ROLE_NAME,
      type: ROLE_TYPE.COMMON,
    },
    {
      name: 'admin',
      desc: '管理员',
      type: ROLE_TYPE.ADMIN,
      auth: [
        {
          name: '鉴查院',
          code: 'monitoring',
          readable: BOOLEAN.TRUE,
          writable: BOOLEAN.TRUE,
        },
      ],
    },
  ]);

  console.log(chalk.green(`已创建角色(仅为管理员设置「鉴查院」权限, 请及时修改权限): ${roles.map(({ name }) => name).join('、')}`));
  return roles;
};

/** 确保用户数据 */
const ensureUsers = async (roles) => {
  const User = mongoose.model('User');
  const password = hash({ data: DEFAULT_PASSWORD });

  const users = await User.create([
    {
      name: '游客',
      account: 'tourist',
      role: roles.find(({ type }) => type === ROLE_TYPE.TOURIST)?.id,
      password,
    },
    {
      name: '管理员',
      account: 'admin',
      role: roles.find(({ type }) => type === ROLE_TYPE.ADMIN)?.id,
      password,
    },
    {
      name: '普通用户',
      account: DEFAULT_ROLE_NAME,
      role: roles.find(({ type }) => type === ROLE_TYPE.COMMON)?.id,
      password,
    },
  ].filter(v.role));

  console.log(chalk.green(
    [
      '已初始化用户, 请及时修改初始密码:',
      `创建用户: ${users.map(({ account }) => account).join('|')}`,
      `初始密码: ${DEFAULT_PASSWORD}`,
    ].join('\n')
  ));
};

/** 确保默认图片(背景、头像)数据 */
const ensurePhotos = async () => {
  const Photo = mongoose.model('Photo');
  await Photo.create([
    {
      type: PHOTO_TYPE.DESKTOP,
      name: 'pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg',
      sourceFileName: 'pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg',
    },
    {
      type: PHOTO_TYPE.AVATAR,
      name: 'pro.MjAyMC0wMS0wMV8xNC0zNy5wbmcxNTc3ODc0ODgwNjk4.png',
      sourceFileName: 'pro.MjAyMC0wMS0wMV8xNC0zNy5wbmcxNTc3ODc0ODgwNjk4.png',
    },
  ]);

  console.log(chalk.green('已创建默认图片: 背景、头像'));
};

export default {
  name: '初始化项目',
  needMongo: false,
  exec: async () => {
    ensureConfig();
    createSecretKey();

    await connectMongo();
    const roles = await ensureRoles();
    await ensureUsers(roles);
    await ensurePhotos();
  },
};
