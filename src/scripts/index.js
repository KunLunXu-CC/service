import ora from 'ora';
import chalk from 'chalk';
import mongo from '#mongo';
import inquirer from 'inquirer';

import { importFiles } from '#utils/fs';

// 1. 连接 mongo 数据库(部分脚本需要连接 mongo)
await mongo();

// 2. 读取所有可选配置
const choices = Object.values(await importFiles({
  dir: new URL('.', import.meta.url),
  filter: (file) => !/index\.js/.test(file),
}));


// 3. 调用 inquirer, 选择需要执行的脚本
const { scriptNames } = await inquirer.prompt([{
  choices,
  type: 'checkbox',
  message: '选择脚本',
  name: 'scriptNames',
}]);

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
      await choices.find((v) => v.name === name).exec();
      spinner.succeed(chalk.green('脚本执行成功!\n'));
    } catch (err) {
      spinner.fail(chalk.red('脚本执行错误!\n'));
      console.log(err);
    }
  }
}

// 5. 退出进程
process.exit();
