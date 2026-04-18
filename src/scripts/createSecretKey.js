import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import { createRasKey } from '#utils/encryption';

const PUBLIC_KEY_PATH = new URL('../config/public.key', import.meta.url);
const PRIVATE_KEY_PATH = new URL('../config/private.key', import.meta.url);

/**
 * 创建 RSA 公私钥
 *
 * @param {object} options 参数
 * @param {boolean} options.silent 是否静默模式（不输出日志）
 * @returns {Promise<void>}
 */
export const createSecretKey = async ({ silent = false } = {}) => {
  if (fs.existsSync(PRIVATE_KEY_PATH) && fs.existsSync(PUBLIC_KEY_PATH)) {
    if (!silent) {
      ora().info(chalk.gray('RSA 公私钥已存在，跳过'));
    }

    return;
  }

  const { privateKey, publicKey } = await createRasKey();
  fs.writeFileSync(PRIVATE_KEY_PATH, privateKey, 'utf-8');
  fs.writeFileSync(PUBLIC_KEY_PATH, publicKey, 'utf-8');

  if (!silent) {
    ora().succeed(chalk.green('已创建 RSA 公私钥: src/config/private.key, src/config/public.key'));
  }
};

// 创建公钥、私钥
export default {
  needMongo: false,
  name: '创建公钥、私钥',
  exec: createSecretKey,
};
