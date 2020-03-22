const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
const shell = require('shelljs');
const inquirer = require('inquirer');
const emailer = require('../../utils/emailer');
const mongo = require('../../utils/mongo');

module.exports = {
  name: '数据处理(Article: 图片处理)',
  exec: async () => {
    // const db = mongo();
    // const serve = db.Article;
    // const urlPre = 'http://qiniu.cdn.blog.qianyin925.com/';

    // // 1. 查询所有数据
    // const data = await serve.find({
    //   content: { $regex: urlPre },
    // });

    // // 2. 处理更新数据
    // const updatelist = data.map(ele => ({
    //   id: ele.id,
    //   content: (ele.content || '').replace(new RegExp(urlPre, 'g'), '')
    // }));

    // // 3. 遍历更新数据
    // for (let article of updatelist){
    //   console.log(article);
    //   await serve.updateMany({
    //     _id: article.id,
    //     content: { $regex: urlPre },
    //   }, {
    //     content: article.content
    //   } , {});
    // }

    // console.log(chalk.green('数据更新完成'));
    console.log('脚本已执行过, 以被注释');
  },
};
