import moment from 'moment';
import logger from '#logger';
import emailer from '#utils/emailer';
import { mkdirPath, readFileList } from '#utils/fs';
import { $ } from 'zx';

$.quote = (v) => v;

const TMP_DIR = '/tmp/backUp'; // 临时备份目录

// 备份文件, 返回备份文件路径
const backups = async () => {
  // 1. 备份配置文件
  mkdirPath(`${TMP_DIR}/config`);
  await $`
    cp -rf \
    ${new URL('../config/system.js', import.meta.url).pathname} \
    ${TMP_DIR}/config
  `;

  // 2. 备份 ssl
  mkdirPath(`${TMP_DIR}/ssl`);
  await $`
    cp -rf \
    ${new URL('../../docker/nginx/ssl.*', import.meta.url).pathname} \
    ${TMP_DIR}/ssl
  `;

  // TODO: 备份静态资源(后面将资源放到七牛云、备不备份, 怎么备份再说)

  // 3. 备份数据库
  mkdirPath(`${TMP_DIR}/databases`);

  // 3.1 读取所有 mongo 备份文件并进行排序
  const mongoBackups = readFileList(
    new URL('../../docker/store/mongo/backups/', import.meta.url).pathname,
  ).sort((a, b) => (b.localeCompare(a))[0]);
    // 3.2 解压
  mongoBackups && await $`tar zxvf ${mongoBackups} -C ${TMP_DIR}/databases`;

  // 4 压缩备份文件
  const backUpPath = `${TMP_DIR}_${moment().format('YYYY_MM_DD__hh_mm_ss')}.tar.gz`;
  await $`cd ${TMP_DIR} && tar -zcvf ${backUpPath} ./*`;

  // 5. 删除临时备份目录
  await $`rm -rf ${TMP_DIR}`;

  return backUpPath;
};

// 任务函数
const onTick = async () => {
  // 1. 备份
  const backupPath = await backups();

  // 2. 发送邮件
  await emailer({
    // 邮件内容(html)
    html: `
      <div>
        <h2>个人网站数据备份</h2>
        <h3>备份内容如下:</h3>
        <p style="text-indent: 2em;">
        1. 生产环境配置文件: production.js
        </p>
        <p style="text-indent: 2em;">
        2. SSL 证书: ssl.pem ssl.key
        </p>
        <p style="text-indent: 2em;">
        3. 数据库备份: mongo.blog
        </p>
        <p style="text-indent: 2em;">
        4. 服务端静态资源备份: app/static
        </p>
        <p style="font-size:12px;text-align: right;">
          当前时间: ${moment().format('YYYY-MM-DD hh:mm:ss')}
        </p>
      </div>
    `,
    subject: '个人网站数据备份',            // 邮件主题
    attachments: [{ path: backupPath }], // 附件
  }).catch((error) => {
    logger.error({ error, label: '个人网站数据备份失败' });
  });

  // 删除备份文件
  $`rm -rf ${backupPath}`;
};

export default {
  onTick,                      // 在指定时间执行该函数
  onComplete: null,            // 当通过停止作业时将触发的函数
  cronTime: '0 30 3 * * *',    // 时间模式(每天早上 3 点 30 分： 0 30 3 * * *)
};
