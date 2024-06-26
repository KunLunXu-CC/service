import fs from 'fs';
import _ from 'lodash';
import chalk from 'chalk';
import boxen from 'boxen';
import inquirer from 'inquirer';
import emailer from '#utils/emailer';
import { $ } from 'zx';

export default {
  name: '发送邮件',
  exec: async () => {
    const { subject, text, attachment, to, ok } = await inquirer.prompt([
      {
        type: 'input',
        name: 'subject',
        message: '邮件主题',
      },
      {
        name: 'text',
        type: 'input',
        message: '邮件内容',
      },
      {
        type: 'input',
        name: 'attachment',
        message: '附件文件(目录、指定文件)',
      },
      {
        name: 'to',
        type: 'input',
        message: '收件人(多个用 , 分割, 默认发送给站长)',
      },
      {
        name: 'ok',
        type: 'confirm',
        default: false,
        message: ({ subject, text, attachment, to }) => {
          const message = [
            { label: '主题: ', value: subject },
            { label: '内容: ', value: text },
            { label: '附件: ', value: attachment || '未添加' },
            { label: '收件人: ', value: to || '站长' },
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
      return false;
    }

    const attachments = [{
      path: (attachment || '').trim(),
    }];

    let tarPath = '';  // 如果是添加附件是目录, 则用于记录文件路径

    // 判断指定附件类型是否是目录, 是则进行压缩发送
    if (attachments[0].path && fs.statSync(attachments[0].path).isDirectory()) {
      // 1. 获取文件名
      const fileName = _.last(attachments[0].path.split('/').filter((v) => v));

      // 2. 压缩包路径
      tarPath = new URL(`./${fileName}.tar.gz`, import.meta.url).pathname;

      // 3. 压缩文件
      await $`cd ${attachments[0].path} && tar -zcvf ${tarPath} ./*`;
      attachments[0].path = tarPath;
    }

    try {
      // 发送邮件
      await emailer({
        to,
        text,
        subject,
        attachments: attachments.filter((v) => v.path),
      });
    } catch (e) {
      // 删除压缩文件
      tarPath && await $`sudo rm -rf ${tarPath}`;
      throw new Error(e);
    }

    // 如果发送的是文件则删除压缩文件
    tarPath && await $`sudo rm -rf ${tarPath}`;
  },
};
