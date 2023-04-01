import logger from '#logger';
import { $, sleep } from 'zx';

$.quote = (v) => v;

const step = [
  {
    title: '下载资源',
    tick: async (tagName) => await $`wget -P /tmp https://github.com/KunLunXu0-0/website/releases/download/${tagName}/release.tar.gz`.exitCode,
  },
  {
    title: '解压资源',
    tick: async () => await $`tar zxvf /tmp/release.tar.gz  -C /tmp`.exitCode,
  },
  {
    title: '更新资源',
    tick: async () => {
      const path = new URL('../../../../docker/nginx/html', import.meta.url).pathname;
      // 删除 path 目录下非 service 内容
      return await $`
        cd ${path} && rm -rf $(ls | grep -v "service") && \
        cp -r /tmp/build/. ${path}
      `.exitCode;
    },
  },
  {
    title: '删除临时文件',
    tick: async (tagName) => {
      logger({ level: 'warn', message: `[webhooks - client] ${tagName} 版代码更新完成！` });
      return await $`rm -rf /tmp/release.tar.gz /tmp/build`.exitCode;
    },
  },
];

// tick
export default async ({ body }) => {
  const { action, release: { tag_name: tagName }  } = body;
  await sleep(1000 * 3); // 睡眠 3s

  // 1. 值处理, 只有创建资源才进行处理
  if (action !== 'created') {
    logger({ label: 'webhooks - client', message: `当前 action: ${action}, 非 created, 不进行任何处理!` });
    return false;
  }

  // 2. 日志收集
  const logs = [
    `[webhooks - client] ${tagName}: 前台更新资源`,
  ];

  for (const { title, tick } of step) {
    const exitCode = await tick(tagName);

    logs.push({
      title,
      res: exitCode === 0 ? '成功' : '失败',
    });

    if (exitCode !== 0) {
      logger({ level: 'error', label: 'webhooks - client', message: logs });
      return false;
    }
  }

  logger({ label: 'webhooks - client', level: 'warn', message: logs });
};
