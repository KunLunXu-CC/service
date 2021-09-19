const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
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
  name: '数据恢复',
  exec: async () => {
    const choices = getChoices();

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
