import logger from '#logger';
import { $, sleep } from 'zx';

$.quote = (v) => v;

const step = [
  {
    title: '进入项目根目录',
    tick: async () => {
      const path = new URL('../../../../', import.meta.url).pathname;
      return await $`cd ${path}`.exitCode;
    },
  },
  {
    title: '拉取最新代码',
    tick: async () => await $`git pull`.exitCode,
  },
  {
    title: '安装项目依赖',
    tick: async () => await $`npm i`.exitCode,
  },
  {
    title: '3 秒后将重启项目',
    tick: async () => {
      setTimeout(async () => {
        await logger({ level: 'warn', message: '[webhooks - service] 3 秒后将重启服务器' });
        await $`npm run restart:pro`.exitCode;
      }, 1000 * 3);
      return 0;
    },
  },
];

// tick
export default async ({ body }) => {
  const { repository, ref } = body;
  await sleep(1000 * 3); // 睡眠 3s

  // 1. 空值处理
  if (ref !== 'refs/heads/master') {
    logger({ label: 'webhooks - service', message: `提交 ${ref} 分支代码, 非 master 分支代码, 不进行任何操作!` });
    return false;
  }

  // 2. 日志收集
  const logs = [
    `[webhooks - service] ${repository.name}: 往 master 提交新代码, 服务将进行重启`,
  ];

  for (const { title, tick } of step) {
    const exitCode = await tick();

    logs.push({
      title,
      res: exitCode === 0 ? '成功' : '失败',
    });

    if (exitCode !== 0) {
      logger({ level: 'error', label: 'webhooks - service', message: logs });
      return false;
    }
  }

  logger({ label: 'webhooks - service', message: logs });
};
