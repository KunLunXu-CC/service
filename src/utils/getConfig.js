
let currentConfig = null;

export default async function getConfig() {
  if (currentConfig) {
    return currentConfig;
  }

  const config = await import('#config/system');
  currentConfig = config.default;
  return currentConfig;
}
