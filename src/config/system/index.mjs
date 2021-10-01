// 根据环境变量 process.env.NODE_ENV 加载对应配置文件
export default async () => {
  const path = new URL(
    `./${(process.env.NODE_ENV ?? 'development')}.mjs`,
    import.meta.url,
  );
  const { default: data } = await import(path);
  return data;
};
