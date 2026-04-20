import fs from 'fs';
import mongoose from 'mongoose';
import { createSecretKey } from './createSecretKey.js';
import {
  BOOLEAN,
  DATA_SCOPE,
  DEFAULT_ROLE_NAME,
  ROLE_TYPE,
  WALLPAPER_CATEGORY,
} from '#config/constants';
import { hash } from '#utils/encryption';
import { fileExists } from '#utils/fs';
import runStep from '#utils/log';

const DEFAULT_PASSWORD = '123456';
const CONFIG_PATH = new URL('../config/system.js', import.meta.url);
const CONFIG_EXAMPLE_PATH = new URL('../config/system.example.js', import.meta.url);

/**
 * 确保配置文件
 *
 * @returns {string} 配置文件处理结果
 */
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

/**
 * 确保用户数据
 *
 * @param {object} root0 参数
 * @param {object} root0.results 上一步执行结果
 * @returns {Promise<object[]>} 用户列表
 */
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

/**
 * 确保有默认壁纸
 *
 * @param {object} root0 参数
 * @param {object} root0.results 上一步执行结果
 * @returns {Promise<object>} 默认壁纸创建结果
 */
const ensureDefaultWallpaper = async ({ results }) => {
  const Wallpaper = mongoose.model('Wallpaper');
  const admin = results.users.find(({ account }) => account === 'admin');

  await Wallpaper.create([
    {
      name: '岛屿',
      description: 'macos 壁纸',
      sourceFileName: 'klx.pro.2ff30568a25a63ad17c157d26a24b670.jpg',
      category: WALLPAPER_CATEGORY.MACOS,
    },
    {
      name: '默认',
      description: 'macos 壁纸',
      sourceFileName: 'klx.pro.94ec66efd3afe1fcc005fa8d88451ec5.jpg',
      category: WALLPAPER_CATEGORY.MACOS,
    },
    {
      name: '日落金山',
      description: 'macos 壁纸',
      sourceFileName: 'klx.pro.94c4354f153b2eb3914d07a6a2b39da4.jpg',
      category: WALLPAPER_CATEGORY.MACOS,
    },
  ].map((item) => ({
    ...item,
    creator: admin.id,
    updater: admin.id,
    scope: DATA_SCOPE.COMMON,
  })));
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
          resultKey: 'users',
          text: '初始化用户',
          exec: ensureUsers,
          successText: (users) => `已创建用户: ${users.map(({ account }) => account).join('|')}，初始密码: ${DEFAULT_PASSWORD}`,
        },
        {
          text: '初始化默认壁纸',
          exec: ensureDefaultWallpaper,
          successText: '初始化默认壁纸完成',
        },
      ],
    });
  },
};
