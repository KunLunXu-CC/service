
let currentSystemConfig = null;

export default async function getSystemConfig() {
  if (currentSystemConfig) {
    return currentSystemConfig;
  }

  const config = await import('#config/system');
  currentSystemConfig = config.default;
  return currentSystemConfig;
}
