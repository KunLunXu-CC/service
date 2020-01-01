# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.1.0 (2020-01-01)


### Bug Fixes

* 【server】添加修改数据时添加用户信息 ([3058534](https://github.com/qianyin925/blog_service/commit/3058534))
* bUG 修复: 删除数据无法再次创建同名数据 ([d7ddc3d](https://github.com/qianyin925/blog_service/commit/d7ddc3d))
* graphql resolve 字段错误 ([ac64e5e](https://github.com/qianyin925/blog_service/commit/ac64e5e))


### Features

* 【client + service】配置文件分离 ([b83415d](https://github.com/qianyin925/blog_service/commit/b83415d))
* 【client】【权限控制】前端应用的展示根据用户权限来定义 ([704efad](https://github.com/qianyin925/blog_service/commit/704efad))
* 【client】【相册】通用头像添加 ([92b6c3a](https://github.com/qianyin925/blog_service/commit/92b6c3a))
* 【client】【编辑器】文章发布功能实现 ([049cdd4](https://github.com/qianyin925/blog_service/commit/049cdd4))
* 【client】【阅读器】当不存在封面时采用默认封面 ([46ee3fc](https://github.com/qianyin925/blog_service/commit/46ee3fc))
* 【client】codemirror 支持图片的黏贴上传 ([e4b7258](https://github.com/qianyin925/blog_service/commit/e4b7258))
* 【client】tag 初始数据脚本添加 ([1bdcbe4](https://github.com/qianyin925/blog_service/commit/1bdcbe4))
* 【client】删除文章时删除对应文章内所有图片 ([cbd3226](https://github.com/qianyin925/blog_service/commit/cbd3226))
* 【client】版本发布测试整理 ([1da3ceb](https://github.com/qianyin925/blog_service/commit/1da3ceb))
* 【client】相册、桌面背景上传、删除、查询 api 实现 ([83597da](https://github.com/qianyin925/blog_service/commit/83597da))
* 【serve】【文章】状态值添加修改 ([83f4b73](https://github.com/qianyin925/blog_service/commit/83f4b73))
* 【server】【Article】原型添加 views 字段, 用于统计热度(阅读量) ([f4c23a4](https://github.com/qianyin925/blog_service/commit/f4c23a4))
* 【server】【BUG】通用查询无法排序问题 ([9cc9ed9](https://github.com/qianyin925/blog_service/commit/9cc9ed9))
* 【server】【docker】时区设置 ([7ec54f3](https://github.com/qianyin925/blog_service/commit/7ec54f3))
* 【server】【脚本】根据数据库 photos 删除七牛云无效图片 ([d8ccb41](https://github.com/qianyin925/blog_service/commit/d8ccb41))
* 【server】【阅读】TOP 10 实现 ([edf4e65](https://github.com/qianyin925/blog_service/commit/edf4e65))
* 【server】docker 重新部署更新脚本 ([a439c01](https://github.com/qianyin925/blog_service/commit/a439c01))
* 【server】node 对图片进行压缩 ([d9142f5](https://github.com/qianyin925/blog_service/commit/d9142f5))
* 【server】前端删除 note 应用, 对应后端初始化数据脚本也要做出相应的调整 ([659a8d9](https://github.com/qianyin925/blog_service/commit/659a8d9))
* 【server】定时任务， 系统 ([c12622e](https://github.com/qianyin925/blog_service/commit/c12622e))
* 【server】常量文件命名错误调整 ([0717a9c](https://github.com/qianyin925/blog_service/commit/0717a9c))
* 【service】graphql 字段调整 ([4160c42](https://github.com/qianyin925/blog_service/commit/4160c42))
* 【service】mongoose 模型修改(设置唯一值) ([348d7b3](https://github.com/qianyin925/blog_service/commit/348d7b3))
* 【service】note 服务端代码实现 ([1094bba](https://github.com/qianyin925/blog_service/commit/1094bba))
* 【service】解析 markdown 并创建 note ([15fd6ba](https://github.com/qianyin925/blog_service/commit/15fd6ba))
* 【service】解析 markdown 并创建 note ([aea5629](https://github.com/qianyin925/blog_service/commit/aea5629))
* 【service】项目脚本整理、gulp 是否必须 ([7e01153](https://github.com/qianyin925/blog_service/commit/7e01153))
* 【网盘实现】【serve】后端 api 实现 ([837f782](https://github.com/qianyin925/blog_service/commit/837f782))
* docker-node npm 镜像源修改 ([26d8351](https://github.com/qianyin925/blog_service/commit/26d8351))
* token 后端实现 ([8f47781](https://github.com/qianyin925/blog_service/commit/8f47781))
* token 联调 ([3fcddc4](https://github.com/qianyin925/blog_service/commit/3fcddc4))
* webHooks 脚本修改 ([8e7dfde](https://github.com/qianyin925/blog_service/commit/8e7dfde))
* 修改  ecosystem.config.js ([1198149](https://github.com/qianyin925/blog_service/commit/1198149))
* 修改部署文档部分 ([b2059bf](https://github.com/qianyin925/blog_service/commit/b2059bf))
* 初始化数据前先删除数据库, 避免无效数据 ([6ba0356](https://github.com/qianyin925/blog_service/commit/6ba0356))
* 删除 graphql implements ([9b77617](https://github.com/qianyin925/blog_service/commit/9b77617))
* 文件删除接口实现 ([f077da0](https://github.com/qianyin925/blog_service/commit/f077da0))
* 添加 docker compose ([cceeedd](https://github.com/qianyin925/blog_service/commit/cceeedd))
* 用户登录功能实现 ([c37e0d5](https://github.com/qianyin925/blog_service/commit/c37e0d5))
* 项目部署测试 ([b33572d](https://github.com/qianyin925/blog_service/commit/b33572d))
