import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';
import { STATS_SPAN, BOOLEAN } from '#config/constants';

/**
 * 获取数据
 *
 * @param {string[]} name name(时间)查询范围
 * @returns {object[]} 返回日记列表
 */
const getData = async ({ name, ctx }) => {
  const serve = mongoose.model('Diary');
  const search = { isDelete: BOOLEAN.FALSE, creator: ctx.state.user.id };

  if (name) {
    search.name = {
      $gte: name?.[0],
      $lte: name?.[1],
    };
  }

  return await serve.find(search);
};

/**
 * 统计字段
 *
 * @param {object}     params            参数
 * @param {object[]}   params.diaries    列表数据
 * @param {string}     params.key        要统计的字段
 * @returns {number} 统计值
 */
const statsField = ({ diaries, key }) => (
  diaries.reduce((outerTotal, outerTotalEle) => (
    outerTotal + (outerTotalEle.bill).reduce(
      (innerTotal, innerEle) => (innerTotal + innerEle[key]),
      0,
    )
  ), 0)
).toFixed(1);

/**
 * 按时间分组统计
 *
 * @param {object}      params        参数
 * @param {object[]}    params.data   待分组的列表数据
 * @param {string}      params.span   规定的时间跨度(day、week、month、year)
 * @returns {object[]}  数组
 */
const groupWithName = ({ data, span }) => {
  // 获取分组时间格式: 对象是 span 字段值和 Format 映射关系
  const format = {
    [STATS_SPAN.DAY]: 'YYYY-MM-DD',
    [STATS_SPAN.WEEK]: 'YYYY年第W周',
    [STATS_SPAN.MONTH]: 'YYYY-MM',
    [STATS_SPAN.YEAR]: 'YYYY',
  }[span] || 'YYYY-MM-DD';

  const groupData = _.groupBy(data, (v) => moment(v.name).format(format));
  const resData = Object.values(groupData).map((diaries) => ({
    diaries,
    name: moment(diaries[0].name).format(format),
    income: statsField({ diaries, key: 'income' }),
    expend: statsField({ diaries, key: 'expend' }),
  }));
  return resData;
};

// 获取统计数据
const getStats = async ({ ctx }) => {
  const data = await getData({ ctx });
  const { income, expend } = data.reduce((total, ele) => {
    const { currIncome, currExpend } = (ele.bill || []).reduce(
      (currTotal, currEle) => ({
        currIncome: currTotal.currIncome + currEle.income,
        currExpend: currTotal.currExpend + currEle.expend,
      }),
      { currIncome: 0, currExpend: 0 },
    );

    return {
      income: total.income + currIncome,
      expend: total.expend + currExpend,
    };
  }, { income: 0, expend: 0 });

  return {
    income: parseInt(income, 10),
    expend: parseInt(expend, 10),
  };
};

export default async ({ ctx, search }) => {
  const { name, span } = search || {};
  const data = await getData({ ctx, name });
  return {
    message: '请求数据成功!',
    stats: await getStats({ ctx }),
    groupWithName: groupWithName({ data, span }),
  };
};
