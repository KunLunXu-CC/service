const path = require('path');
const chalk = require('chalk');
const puppeteer = require('puppeteer');

// 执行脚本: 初始化 echart
const SCRIPT_CONTENT = `
  (function (window) {
    let option = window.chart.option;
    var myChart = window.echarts.init(document.getElementById('container'), null, {
        renderer: 'svg'
    });
    myChart.setOption(option);
  })(this);
`;

// 获取页面内容
const getPageContent = (width, height) => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="container" style="width: ${width}px;height:${height}px;"></div>
    </body>
  </html>
`;

/**
 * 生成 echarts 图表
 * @param {Number} height 图片高度
 * @param {Number} width 图片宽度
 * @param {Object} option echarts 图表配置项
 * @param {Object} screenshot puppeteer screenshot 方法参数, 截图配置
 * @param {string} screenshot.path 截图保存路径, 截图图片类型将从文件扩展名推断出来。如果是相对路径，则从当前路径解析。如果没有指定路径，图片将不会保存到硬盘。
 * @param {string} screenshot.type 指定截图类型, 可以是 jpeg 或者 png。默认 'png'.
 * @param {number} screenshot.quality 图片质量, 可选值 0-100. png 类型不适用。
 * @param {boolean} screenshot.fullPage 如果设置为true，则对完整的页面（需要滚动的部分也包含在内）。默认是false
 * @param {Object} screenshot.clip 指定裁剪区域。需要配置：{ x, y, width, height } 配置项目分别是: 裁剪区域相对于左上角（0， 0）的x 、y 坐标、裁剪区域宽高
 * @param {boolean} screenshot.omitBackground 隐藏默认的白色背景，背景透明。默认不透明
 * @param {string} screenshot.encoding 图像的编码可以是 base64 或 binary。 默认为“二进制”。
 *
 * @return <Promise<[Buffer|String]>> Promise对象, resolve 后是截图的 buffer、base64
 */
module.exports = async ({
  option,
  screenshot,
  width = 1200,
  height = 800,
}) => {
  // 1. 创建浏览器实例
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });

  // 2. 创建page对象
  const page = await browser.newPage();
  await page.setContent(getPageContent(width, height));

  // 3. 导入依赖包: 导入 echarts 包
  await page.addScriptTag({
    path: path.resolve(__dirname, '../node_modules/echarts/dist/echarts.min.js'),
  });

  // 4. 往页面传递数据: 传递 option
  await page.evaluate( option => {
    window.chart = { option };
  }, option);

  // 5. 执行 javaScript 脚本
  await page.addScriptTag({ content: SCRIPT_CONTENT });

  // 6. 获取图片
  await page.waitFor(1000); // 停留一秒，否则有可能图表还没渲染完就截图
  const $el = await page.waitForSelector('#container');
  const imgData = await $el.screenshot(screenshot);
  console.log(chalk.green('成功生成 echart 图表!'));

  // 7. 关闭页面、浏览器、返回数据
  await page.close();
  await browser.close();
  return imgData;
};
