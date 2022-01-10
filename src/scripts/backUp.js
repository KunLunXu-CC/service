import ora from 'ora';
import chalk from 'chalk';
import shell from 'shelljs';
import inquirer from 'inquirer';

const choices = [
  {
    name: '备份配置文件(production.js)',
    exec: async ({ dest }) => {
      console.log('开始备份配置文件！');

      if (shell.exec(`
        # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        sudo rm -rf ${dest}/config
        sudo mkdir -p ${dest}/config

        # 备份文件
        sudo cp ${new URL('../../config/system/index.js/production', import.meta.url).pathname} ${dest}/config/production.js
      `).code === 0) {
        console.log('配置文件备份完成, 备份路径: ', chalk.green(`${dest}/config/production.js`));
      }
    },
  },
  {
    name: '备份数据库',
    exec: async ({ dest }) => {
      // 1. 备份 mongo.blog 数据
      console.log('开始备份 blog 数据！');

      if (shell.exec(`
        # 执行 docker 内部命令进行备份数据
        sudo docker exec blog-mongo sh -c 'mongodump -d blog -o /backUp'

        # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        sudo rm -rf ${dest}/databases/blog
        sudo mkdir -p ${dest}/databases

        # 从容器内将备份数据复制到宿主机器
        sudo docker cp blog-mongo:/backUp/blog ${dest}/databases

        # 执行 docker 命令, 删除容器内的备份数据
        sudo docker exec blog-mongo sh -c 'rm -rf /backUp'
      `).code === 0) {
        console.log('blog 数据备份完成, 备份路径: ', chalk.green(`${dest}/databases/blog`));
      }
    },
  },
  {
    name: '备份 SSL',
    exec: async ({ dest }) => {
      console.log('开始备份 SSL 文件！');

      if (shell.exec(`
        # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        sudo rm -rf ${dest}/ssl
        sudo mkdir -p ${dest}/ssl

        # 备份文件
        sudo cp ${new URL('../../docker/nginx/ssl.*', import.meta.url).pathname} ${dest}/ssl/
      `).code === 0) {
        console.log('SSL 文件备份完成, 备份路径: ', chalk.green(`${dest}/ssl`));
      }
    },
  },
  {
    name: '备份静态目录',
    exec: async ({ dest }) => {
      console.log('开始备份静态目录！');

      if (shell.exec(`
        # 删除旧的备份数据, 并创建备份目录(避免因目录不存在出现错误)
        sudo rm -rf ${dest}/static
        sudo mkdir -p ${dest}/static

        # 备份文件
        sudo cp -rf ${new URL('../../static/*', import.meta.url).pathname} ${dest}/static
      `).code === 0) {
        console.log('静态目录备份完成, 备份路径: ', chalk.green(`${dest}/static`));
      }
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
        spinner.info(chalk.yellow('开始备份!\n'));

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
