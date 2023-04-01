import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { $ } from 'zx';

const choices = [
  {
    name: '备份配置文件(config/system.js)',
    exec: async ({ dest }) => {
      console.log('开始备份配置文件！');
      const res = await Promise.all([
        // 1. 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        await $`sudo rm -rf ${dest}/config`,
        await $`sudo mkdir -p ${dest}/config`,

        // 2. 备份文件
        await $`sudo cp ${new URL('../config/system.js', import.meta.url).pathname} ${dest}/config/system.js`,
      ]);

      res.every((v) => v.exitCode === 0) &&
      console.log('配置文件备份完成, 备份路径: ', chalk.green(`${dest}/config/system.js`));
    },
  },
  {
    name: '备份数据库',
    exec: async ({ dest }) => {
      console.log('开始备份 blog 数据！');

      const res = await Promise.all([
        // 1. 执行 docker 内部命令进行备份数据
        await $`sudo docker exec klx-mongo sh -c 'mongodump -d blog -o /backUp'`,
        // 2. 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        await $`sudo rm -rf ${dest}/databases/blog`,
        await $`sudo mkdir -p ${dest}/databases`,
        // 3. 从容器内将备份数据复制到宿主机器
        await $`sudo docker cp klx-mongo:/backUp/blog ${dest}/databases`,
        // 4. 执行 docker 命令, 删除容器内的备份数据
        await $`sudo docker exec klx-mongo sh -c 'rm -rf /backUp'`,
      ]);

      res.every((v) => v.exitCode === 0) &&
      console.log('blog 数据备份完成, 备份路径: ', chalk.green(`${dest}/databases/blog`));
    },
  },
  {
    name: '备份 SSL',
    exec: async ({ dest }) => {
      console.log('开始备份 SSL 文件！');
      const res = await Promise.all([
        // 1. 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        await $`sudo rm -rf ${dest}/ssl`,
        await $`sudo mkdir -p ${dest}/ssl`,

        // 2. 备份文件
        await $`sudo cp ${new URL('../../docker/nginx/ssl.*', import.meta.url).pathname} ${dest}/ssl/`,
      ]);

      res.every((v) => v.exitCode === 0) &&
      console.log('SSL 文件备份完成, 备份路径: ', chalk.green(`${dest}/ssl`));
    },
  },
];

export default {
  name: '备份数据',
  exec: async () => {
    const { dest, execNames } = await inquirer.prompt([
      {
        name: 'dest',
        type: 'input',
        default: '~/backUp',
        message: '备份文件存储目录',
      },
      {
        choices,
        type: 'checkbox',
        name: 'execNames',
        message: '选择要备份的内容',
      },
    ]);

    if (execNames.length === 0) {
      ora().warn(chalk.yellow('未选择备份内容!\n'));
    } else {
      for (const name of execNames) {
        const spinner = ora({
          prefixText: chalk.magenta(`\n【备份内容 - ${name}】`),
        });
        spinner.info(chalk.yellow('开始备份!'));

        try {
          await choices.find((v) => v.name  === name).exec({
            dest,
          });
          spinner.succeed(chalk.green('完成备份!\n'));
        } catch (err) {
          spinner.fail(chalk.red('备份错误!\n'));
          console.log(err);
        }
      }
    }
  },
};
