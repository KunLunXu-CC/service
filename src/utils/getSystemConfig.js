let currentSystemConfig = null;

/**
 * 获取系统配置
 *
 * @returns {Promise<object>} 系统配置
 */
export default async function getSystemConfig () {
  if (currentSystemConfig) {
    return currentSystemConfig;
  }

  const config = await import('#config/system');
  currentSystemConfig = config.default;
  return currentSystemConfig;
}
