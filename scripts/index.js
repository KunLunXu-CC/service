const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { requireFiles } = require('../utils');

// 1. 获取 choices 配置
const getChoices = (choices = []) => {
  // 1. 加载所有脚本配置:
  // [{ name: '显示名称(不能重复)', exec: async () => {待执行脚本}}]
  requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: file => (path.basename(file) !== 'index.script.js'),
    handler: dest => {
      choices.push(require(dest));
    }
  });
  return choices;
}

// 2. 主方法
const main = async () => {
  const choices = getChoices();

  // 调用 inquirer, 选择需要执行的脚本
  const { scriptNames } = await inquirer.prompt([{
    choices,
    type: 'checkbox',
    message: '选择脚本',
    name: 'scriptNames',
  }]);

  if (scriptNames.length === 0) {

  } else {
    ora().warn('warn!');
    ora().succeed('succeed!');
    ora().fail('fail!');
    ora().warn('warn!');
    ora().info('info!');
    scriptNames.forEach(async name => {
      try {
        await choices.find(v => v.name  === name).exec();
      } catch(err) {
        console.log(chalk.red('脚本执行错误!\n'));
        console.log(err);
      }
    });
  }
}

// 执行主方法
main();
