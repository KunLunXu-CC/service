// import ora from 'ora';
// import path from 'path';
// import chalk from 'chalk';
// import mongo from '../mongo';
// import inquirer from 'inquirer';

import { importFiles } from '../utils/index.mjs';
importFiles({
  dir: new URL('.', import.meta.url),
  filter: (file) => /index\.script\.mjs/.test(file),
});

// // 1. 获取 choices 配置
// const getChoices = (choices = []) => {
//   // 1. 加载所有脚本配置:
//   // [{ name: '显示名称(不能重复)', exec: async () => {待执行脚本}}]
//   importFiles({
//     dir: new URL('.', import.meta.url).pathname,
//     filter: (file) => (path.basename(file) !== 'index.script.js'),
//     handler: (dest) => {
//       choices.push(require(dest));
//     },
//   });
//   return choices;
// };

// // 2. 主方法
// const main = async () => {
//   await mongo(); // 连接 mongo 数据库

//   const choices = getChoices();

//   // 调用 inquirer, 选择需要执行的脚本
//   const { scriptNames } = await inquirer.prompt([{
//     choices,
//     type: 'checkbox',
//     message: '选择脚本',
//     name: 'scriptNames',
//   }]);

//   if (scriptNames.length === 0) {
//     ora().warn(chalk.yellow('未选定任何脚本!\n'));
//   } else {
//     for (const name of scriptNames) {
//       const spinner = ora({
//         prefixText: chalk.magenta(`\n【脚本 - ${name}】`),
//       });
//       spinner.info(chalk.yellow('开始执行脚本!\n'));

//       try {
//         await choices.find((v) => v.name  === name).exec();
//         spinner.succeed(chalk.green('脚本执行成功!\n'));
//       } catch (err) {
//         spinner.fail(chalk.red('脚本执行错误!\n'));
//         console.log(err);
//       }
//     }
//   }
// };

// // 执行主方法
// main();
