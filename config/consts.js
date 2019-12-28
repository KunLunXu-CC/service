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

// 响应状态 (1: 成功, 0: 失败)
module.exports.RESCODE = {
  SUCCESS: 1,
  FAIL: 0
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

// 假删名称(name)前缀
module.exports.PREFIX_DELETED = 'DELETED_';
