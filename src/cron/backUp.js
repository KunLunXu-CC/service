import moment from 'moment';
import logger from '#logger';
import emailer from '#utils/emailer';
import { mkdirPath, readFileList } from '#utils/fs';
import { $ } from 'zx';
$.quote = (v) => v;

const TMP_DIR = '/tmp/backUp'; // 临时备份目录

// 任务函数
const onTick = async () => {
  // 1. 备份文件路径
  const backUpPath = `${TMP_DIR}_${moment().format('YYYY_MM_DD__HH_mm_ss')}.tar.gz`;

  // 2. 任务步骤
  const step = [
    {
      title: '备份配置文件',
      tick: async () => {
        const path = `${TMP_DIR}/config`;
        mkdirPath(path);
        await $`
        cp -rf \
        ${new URL('../config/system.js', import.meta.url).pathname} \
        ${path}
      `;
        return `备份配置文件 (${path}/system.js) 成功!`;
      },
    },
    {
      title: '备份 SSL',
      tick: async () => {
        const path = `${TMP_DIR}/ssl`;
        mkdirPath(path);
        await $`
        cp -rf \
        ${new URL('../../docker/nginx/ssl.*', import.meta.url).pathname} \
        ${path}
      `;
        return `备份 SSL (${path}/ssl.*) 成功!`;
      },
    },
    {
      title: '备份数据库',
      tick: async () => {
        const path = `${TMP_DIR}/databases`;
        mkdirPath(path);

        // 1 读取 mongo 备份文件路径: 读取所有备份路径、排序、获取第一个路径
        const mongoBackupPath = readFileList(
          new URL('../../docker/store/mongo/backups/', import.meta.url).pathname,
        ).sort((a, b) => (b.localeCompare(a)))?.[0];

        // 2 空值处理
        if (!mongoBackupPath) {
          return '备份数据库不存在!';
        }

        // 3 拷贝
        await $`cp -rf ${mongoBackupPath} ${path}`;
        return `备份数据库文件 (${path}) 成功!`;
      },
    },
    {
      title: '压缩备份文件',
      tick: async () => {
        await $`cd ${TMP_DIR} && tar -zcvf ${backUpPath} ./*`;
        return `压缩备份文件 (${backUpPath}) 成功!`;
      },
    },
    {
      title: '删除临时备份目录',
      tick: async () => {
        await $`rm -rf ${TMP_DIR}`;
        return `删除临时备份目录(${TMP_DIR})成功!`;
      },
    },
    {
      title: '发送邮件',
      tick: async () => {
        await emailer({
        // 邮件内容(html)
          html: `
          <div>
            <h2>个人网站数据备份</h2>
            <h3>备份内容如下:</h3>
            <p style="text-indent: 2em;">
            1. 生产环境配置文件: system.js
            </p>
            <p style="text-indent: 2em;">
            2. SSL 证书: ssl.pem ssl.key
            </p>
            <p style="text-indent: 2em;">
            3. 数据库备份: mongo.blog
            </p>
            <p style="font-size:12px;text-align: right;">
              当前时间: ${moment().format('YYYY-MM-DD hh:mm:ss')}
            </p>
          </div>
        `,
          subject: '个人网站数据备份',            // 邮件主题
          attachments: [{ path: backUpPath }], // 附件
        });
        return '发送邮件成功!';
      },
    },
    {
      title: '删除备份文件',
      tick: async () => {
        await $`rm -rf ${backUpPath}`;
        return `删除备份文件 (${backUpPath}) 成功`;
      },
    },
  ];

  // 3. 日志收集
  const logs = [];

  // 4. 循环执行任务
  for (const { title, tick } of step) {
    const log = { title };

    try {
      log.res = await tick();
    } catch (error) {
      log.error = error;
    }

    logs.push(log);
  }

  // 5. 打印日志
  logger({ level: 'warn', label: '数据备份', message: logs });
};

export default {
  onTick,                      // 在指定时间执行该函数
  onComplete: null,            // 当通过停止作业时将触发的函数
  cronTime: '0 30 3 * * *',    // 时间模式(每天早上 3 点 30 分： 0 30 3 * * *)
};
