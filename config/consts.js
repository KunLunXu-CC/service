/* 常量配置 */

// 布尔值
module.exports.BOOLEAN = {
  TRUE: 1,
  FALSE: 0,
};

// 模型基本状态 (0: 禁用， 1： 启用， -11： 删除) 基本状态预留 0 - 10
module.exports.STATUS = {
  DISABLE: 0,     // 禁用
  ENABLE: 1,      // 启用
  DELETE: -11,    // 删除
}

// 文章状态： 基础状态 + 保存 + 发布, 补充状态从 10 起
module.exports.ARTICLE_STATUS = {
  ...this.STATUS,   // 基础状态
  SAVE: 10,          // 保存(未发布)
  RELEASE: 11,       // 发布(已发布)
};

// 性别
module.exports.SEX = {
  BOY: 1,             //男
  GIRL: 2,            // 女
};

// 图片类型(使用场景)
module.exports.PHOTO_TYPE = {
  UNKNOWN: 0,         // 未知
  ARTICLE: 1,         // 文章
  DESKTOP: 2,         // 桌面
  THUMB: 3,           // 缩略图(通用)
  AVATAR: 4,          // 头像
};

// 角色类型
module.exports.ROLE_TYPE = {
  ADMIN: 1,        // 管理员
  TOURIST: 2,      // 游客
};

// 饮食类型
module.exports.DIET_TYPE = {
  BREAKFAST: 0,            // 早餐
  AFTER_BREAKFAST: 1,      // 上午加餐

  LUNCH: 2,                // 午餐
  AFTER_LUNCH: 3,          // 下午加餐

  DINNER: 4,               // 晚餐
  AFTER_DINNER: 5,         // 晚上加餐(夜宵)

  AFTER_FITNESS: 6,        // 健身加餐(健身之后)
};

// 健身运动类型
module.exports.FITNESS_TYPE = {
  AEROBIC: 0,    // 有氧
  ANAEROBIC: 1,  // 无氧
};

// 统计跨度
module.exports.STATS_SAPN = {
  DAY: 'day',      // 按天
  WEEK: 'week',    // 按周
  MONTH: 'month',  // 按月
  YEAR: 'year',    // 按年
};
