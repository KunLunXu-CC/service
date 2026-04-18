import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

import { importFiles } from '#utils/fs';
import { $ } from 'zx';

$.quote = (v) => v;

const connectMongo = async () => {
  const { default: mongo } = await import('#mongo');
  await mongo();
};

// 1. 读取所有可选配置
const choices = await importFiles({
  dir: new URL('.', import.meta.url),
  filter: (file) => !/index\.js/.test(file),
});

// 2. 调用 inquirer, 选择需要执行的脚本
const { scriptNames } = await inquirer.prompt([{
  choices: choices.map(({ value }) => value),
  type: 'checkbox',
  message: '选择脚本',
  name: 'scriptNames',
}]);

// 3. 如果有脚本需要连接 MongoDB, 则先连接 MongoDB
if (choices.some(({ value }) => (
  scriptNames.includes(value.name) && value.needMongo
))) {
  try {
    ora().info('正在连接 MongoDB...\n');
    await connectMongo();
  } catch (err) {
    ora().fail('MongoDB 连接失败!\n');
    console.error(err);
  }
}

// 4. 循环执行脚本
if (scriptNames.length === 0) {
  ora().warn(chalk.yellow('未选定任何脚本!\n'));
} else {
  for (const name of scriptNames) {
    const spinner = ora({
      prefixText: chalk.magenta(`\n【脚本 - ${name}】`),
    });

    spinner.info(chalk.yellow('开始执行脚本!\n'));

    try {
      const { exec } = choices.find(({ value }) => value.name === name).value;
      await exec();
      spinner.succeed(chalk.green('脚本执行成功!\n'));
    } catch (err) {
      spinner.fail(chalk.red('脚本执行错误!\n'));
      console.log(err);
    }
  }
}

// 5. 退出进程
process.exit();
