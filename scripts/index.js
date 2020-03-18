const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { requireFiles } = require('../utils');

// 加载所有脚本配置:
// [{ name: '显示名称(不能重复)', exec: async () => {待执行脚本}}]
const scripts = [];
requireFiles({
  dir: path.resolve(__dirname, '.'),
  filter: file => (path.basename(file) !== 'index.script.js'),
  handler: dest => {
    scripts.push(require(dest));
  }
});

// 调用 inquirer, 选择需要执行的脚本
inquirer.prompt([{
  type: 'list',
  name: 'script',
  choices: scripts,
  message: '选择脚本',
}]).then(async ({ script }) => {
  const exec = (scripts.find(v => v.name  === script) || {}).exec;
  console.log(chalk.yellow(`【${script}】开始执行脚本\n`));
  if (!exec) {
    console.log(chalk.red(`【${script}】未找到脚本!\n`));
  } else {
    await exec();
    console.log(chalk.green(`【${script}】脚本执行完成!\n`));
  }
}).catch ( err => {
  console.log(chalk.red('脚本执行错误!\n'));
  console.log(err);
});
