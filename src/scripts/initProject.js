import fs from 'fs';
import mongoose from 'mongoose';
import { createSecretKey } from './createSecretKey.js';
import { BOOLEAN, DEFAULT_ROLE_NAME, PHOTO_TYPE, ROLE_TYPE } from '#config/constants';
import { hash } from '#utils/encryption';
import { fileExists } from '#utils/fs';
import { runStep } from '#utils/log';

const DEFAULT_PASSWORD = '123456';
const CONFIG_PATH = new URL('../config/system.js', import.meta.url);
const CONFIG_EXAMPLE_PATH = new URL('../config/system.example.js', import.meta.url);

/** 确保配置文件 */
const ensureConfig = () => {
  if (fileExists(CONFIG_PATH)) {
    return '配置文件已存在，跳过: src/config/system.js';
  }

  fs.copyFileSync(CONFIG_EXAMPLE_PATH, CONFIG_PATH);
  return '已创建配置文件: src/config/system.js';
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

  return roles;
};

/** 确保用户数据 */
const ensureUsers = async ({ results }) => {
  const { roles } = results;
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
  ].filter(({ role }) => role));

  return users;
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

  return '背景、头像';
};

export default {
  name: '初始化项目',
  needMongo: false,
  exec: async () => {
    await runStep({
      title: '初始化项目',
      steps: [
        {
          text: '检查配置文件',
          exec: ensureConfig,
          successText: (message) => message,
        },
        {
          text: '生成 RSA 密钥',
          exec: () => createSecretKey({ silent: true }),
          successText: 'RSA 公私钥已就绪',
        },
        {
          text: '连接 MongoDB',
          exec: connectMongo,
          successText: 'MongoDB 已连接',
        },
        {
          resultKey: 'roles',
          text: '初始化角色',
          exec: ensureRoles,
          successText: (roleList) => `已创建角色: ${roleList.map(({ name }) => name).join('、')}`,
        },
        {
          text: '初始化用户',
          exec: ensureUsers,
          successText: (users) => `已创建用户: ${users.map(({ account }) => account).join('|')}，初始密码: ${DEFAULT_PASSWORD}`,
        },
        {
          text: '初始化默认图片',
          exec: ensurePhotos,
          successText: (photos) => `已创建默认图片: ${photos}`,
        },
      ],
    });
  },
};
