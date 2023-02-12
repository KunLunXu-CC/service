/* 常量配置 */

// 应用 CODE
export const APP_CODE = {
  DRAW: 'draw',                  // 绘图
  READ: 'read',                  // 阅读
  ALBUM: 'album',                // 相册
  DIARY: 'diary',                // 日记
  EDITOR: 'editor',              // 编辑器
  LOGGER: 'logger',              // 日志
  ARTICLE: 'article',            // 文章
  DATASETSFROM: 'datasetsfrom',  // 数据字典(数据集)
};

// 布尔值
export const BOOLEAN = {
  TRUE: 1,
  FALSE: 0,
};

// 文章状态： 保存 + 发布, 补充状态从 10 起,
// TODO: 之前设计了其他状态, 现在被删除了, 这边需要修复下
export const ARTICLE_STATUS = {
  SAVE: 10,          // 保存(未发布)
  RELEASE: 11,       // 发布(已发布)
};

// 性别
export const SEX = {
  BOY: 1,             // 男
  GIRL: 2,            // 女
};

// 图片类型(使用场景)
export const PHOTO_TYPE = {
  UNKNOWN: 0,         // 未知
  ARTICLE: 1,         // 文章
  DESKTOP: 2,         // 桌面
  THUMB: 3,           // 缩略图(通用)
  AVATAR: 4,          // 头像
};

// 角色类型
export const ROLE_TYPE = {
  ADMIN: 1,        // 管理员
  TOURIST: 2,      // 游客
};

// 饮食类型
export const DIET_TYPE = {
  BREAKFAST: 0,            // 早餐
  AFTER_BREAKFAST: 1,      // 上午加餐

  LUNCH: 2,                // 午餐
  AFTER_LUNCH: 3,          // 下午加餐

  DINNER: 4,               // 晚餐
  AFTER_DINNER: 5,         // 晚上加餐(夜宵)

  AFTER_FITNESS: 6,        // 健身加餐(健身之后)
};

// 健身运动类型
export const FITNESS_TYPE = {
  AEROBIC: 0,    // 有氧
  ANAEROBIC: 1,  // 无氧
};

// 统计跨度
export const STATS_SAPN = {
  DAY: 'day',      // 按天
  WEEK: 'week',    // 按周
  MONTH: 'month',  // 按月
  YEAR: 'year',    // 按年
};

// WebSocket 类型: 消息、连接类型, 根据 type 进行不同业务出现
export const WS_TYPE = {
  LOGGER: 0,     // 日志
};

// 目录 - type
export const FOLDER_TYPE = {
  ARTICLE: 0, // 文章
};
