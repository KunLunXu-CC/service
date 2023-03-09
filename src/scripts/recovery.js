import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import { $ } from 'zx';

const choices = [
  {
    name: '恢复配置文件(config/system.js)',
    exec: async ({ dest }) => {
      console.log('开始恢复配置文件！');
      const { exitCode } = await $`
        sudo cp -f ${dest}/config/system.js ${new URL('../config/system/system.js', import.meta.url).pathname}
      `;
      exitCode.code === 0 && console.log('配置文件已恢复');
    },
  },
  {
    name: '恢复数据库',
    exec: async ({ dest }) => {
      // 1. 备份 mongo.blog 数据
      console.log('开始恢复数据库！');

      const res = await Promise.all([
        // 1. 将备份文件拷贝到容器内
        await $`sudo docker cp ${dest}/databases/blog blog-mongo:/backUp`,
        // 2. 执行 docker 内部命令进行数据恢复
        await $`sudo docker exec blog-mongo sh -c 'mongorestore -d blog --drop /backUp'`,
        // 3. 删除容器内的临时文件
        await $`sudo docker exec blog-mongo sh -c 'rm -rf /backUp'`,
      ]);

      res.every((v) => v.exitCode === 0) && console.log('恢复数据库完成');
    },
  },
  {
    name: '恢复 SSL',
    exec: async ({ dest }) => {
      console.log('开始恢复 SSL 文件！');
      const { exitCode } = await $`
        sudo cp -f ${dest}/ssl/ssl.* ${new URL('../../docker/nginx', import.meta.url).pathname}
      `;
      exitCode.code === 0 && console.log('SSL 文件恢复完成');
    },
  },
];

export default {
  name: '数据恢复',
  exec: async () => {
    const { dest, execNames, ok } = await inquirer.prompt([
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
        message: '选择要恢复的内容',
      },
      {
        name: 'ok',
        type: 'confirm',
        default: false,
        message: ({ execNames, dest }) => {
          const message = [
            {
              value: dest,
              label: '备份文件目录: ',
            },
            {
              label: '恢复项: ',
              value: `${execNames.length} 个`,
            },
            ...execNames.map((value, index) => ({
              value,
              label: `     ${index + 1}. `,
            })),
          ].reduce((mes, item) => {
            const br = mes ? '\n' : '';
            const label = chalk.green(item.label || '');
            const value = chalk.yellow(item.value || '');
            return `${mes}${br}${label}${value}`;
          }, '');

          console.log(boxen(message,
            {
              padding: 1,
              borderColor: 'green',
            },
          ));
          return '是否确认当前选择?';
        },
      },
    ]);

    if (!ok) {
      ora().warn(chalk.yellow('取消数据恢复操作!\n'));
    } else if (execNames.length === 0) {
      ora().warn(chalk.yellow('未选择要内容的内容!\n'));
    } else {
      for (const name of execNames) {
        const spinner = ora({
          prefixText: chalk.magenta(`\n【 - ${name}】`),
        });
        spinner.info(chalk.yellow('数据恢复!\n'));

        try {
          await choices.find((v) => v.name  === name).exec({
            dest,
          });
          spinner.succeed(chalk.green('完成数据恢复!\n'));
        } catch (err) {
          spinner.fail(chalk.red('数据恢复错误!\n'));
          console.log(err);
        }
      }
    }
  },
};
