const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { requireFiles } = require('../../utils');

// 1. 获取 choices 配置
const getChoices = (choices = []) => {
  // 1. 加载所有脚本配置:
  // [{ name: '显示名称(不能重复)', exec: async () => {待执行脚本}}]
  requireFiles({
    dir: path.resolve(__dirname, '.'),
    filter: [path.resolve(__dirname, './index.script.js')],
    handler: (dest) => {
      choices.push(require(dest));
    },
  });
  return choices;
};

module.exports = {
  name: '备份数据',
  exec: async () => {
    const choices = getChoices();

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
