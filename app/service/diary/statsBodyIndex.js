const _ = require('lodash');
const moment = require('moment');
const { STATUS, STATS_SAPN } = require('../../../config/consts');

/**
 * 获取数据
 * @param {Object} ctx koa 上下文
 * @param {String[]} name name(时间)查询范围
 * @returns {Object[]}
 */
const getData = async ({ ctx, name }) => {
  const serve = ctx.db.mongo.Diary;
  const search = { status: { $ne: STATUS.DELETE } };
  if (name) {
    search.name = {};
    name[0] && (search.name.$gte = name[0]);
    name[1] && (search.name.$lte = name[1]);
  }
  return await serve.find(search);
}

/**
 * 获取指定字段的平均值, 空值不纳入计算(包括 0)
 * @param {Object[]} diaries 列表数据
 * @param {String} key 要统计的字段
 * @returns {Number} 统计值
 */
const getFieldAvg = ({ diaries, key }) => {
  let count = 0;
  const total = diaries.reduce((total, ele) => {
    ele.bodyIndex[key] && (count ++)
    return total + ele.bodyIndex[key];
  }, 0)
  return count ? (total / count).toFixed(2) : 0;
};

/**
 * 按 name (时间)分组
 * @param {Object[]} data 待分组的列表数据
 * @param {String} span 规定的时间跨度(day、week、month、year)
 * @returns {Object[]}
 */
const groupWithName = ({ data, span }) => {
  // 获取分组时间格式: 对象是 span 字段值和 Format 映射关系
  const format = {
    [STATS_SAPN.DAY]: 'YYYY-MM-DD',
    [STATS_SAPN.WEEK]: 'YYYY年第W周',
    [STATS_SAPN.MONTH]: 'YYYY-MM',
    [STATS_SAPN.YEAR]: 'YYYY',
  }[span] || 'YYYY-MM-DD';
  const groupData = _.groupBy(data, v => moment(v.name).format(format));
  const resData = Object.values(groupData).map(diaries => ({
    diaries,
    name: moment(diaries[0].name).format(format),
    bodyIndex: {
      bim: getFieldAvg({ diaries, key: 'bim'}),
      weight: getFieldAvg({ diaries, key: 'weight'}),
      muscle: getFieldAvg({ diaries, key: 'muscle'}),
      bodyfat: getFieldAvg({ diaries, key: 'bodyfat'}),
      moistureContent: getFieldAvg({ diaries, key: 'moistureContent'}),
    },
  }));
  return resData;
}

module.exports = async ({ ctx, search }) => {
  const { name, span } = search || {};
  const data = await getData({ ctx, name });
  return {
    list: groupWithName({ data, span }),
    message: '请求数据成功!'
  };
};
