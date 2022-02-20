import logger from '#logger';
import { $ } from 'zx';
$.quote = (v) => v;

const step = [
  {
    title: '设置相关文件权限',
    tick: async () => {
      const { exitCode } = await $`chmod -R 777 /var/log/pm2 ~/.config ~/.npm`;
      return `设置相关文件权限${exitCode === 0 ? '成功' : '失败'}!`;
    },
  },
  {
    title: '进入项目根目录',
    tick: async () => {
      const path = new URL('../../../../', import.meta.url).pathname;
      const { exitCode } = await $`cd ${path}`;
      return `进入项目根目录 (${path}) ${exitCode === 0 ? '成功' : '失败'}!`;
    },
  },
  {
    title: '拉取最新代码',
    tick: async () => {
      const { exitCode } = await $`git pull`;
      return  `拉取最新代码${exitCode === 0 ? '成功' : '失败'}!`;
    },
  },
  {
    title: '安装项目依赖',
    tick: async () => {
      const { exitCode } = await $`npm i`;
      return  `安装项目依赖${exitCode === 0 ? '成功' : '失败'}!`;
    },
  },
  {
    title: '重启项目',
    tick: async () => {
      setTimeout(async () => {
        const { exitCode } = await $`npm run restart:pro`;
        logger.info(`[webhooks] 服务重启 ${exitCode === 0 ? '成功' : '失败'}`);
      }, 1000 * 60);

      return  '60 秒后将重启项目!';
    },
  },
];

// tick
export default async ({ body }) => {
  const { repository, ref } = body;

  // 1. 空值处理
  if (ref !== 'refs/heads/master') {
    logger.info('[webhooks] 提交非 master 分支代码, 不进行任何操作!');
    return false;
  }

  // 2. 日志收集
  const logs = [
    `[webhooks] ${repository.name}: 往 master 提交新代码, 服务将进行重启`,
  ];

  for (const { title, tick } of step) {
    const log = { title };

    try {
      log.res = await tick();
    } catch (error) {
      log.error = error;
    }

    logs.push(log);
  }

  logger.info(logs);
};
