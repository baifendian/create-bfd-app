# 更新日志

## v1.2.0

`2017.05.27`

- webpack 升级到 v2
- dev 和 prod 配置分开，方便维护
- build 命令可设置 --output-path


## v1.1.1

`2017-04-27`

- 更新了 ESLint 部分规则
- 增加了 Mockjs 插件，可以虚拟ajax请求的数据，更高效的进行前端开发
- 默认安装 bfd-ui 最新版本
- react、react-dom 升级到 0.14.9


## v1.1.0

`2017-01-18`

- 更新了模板部分样式
- react-router 升级到 2.x
- 去除了 fastclick 强依赖，如需兼容移动端请请自行添加
- pace 进度提示升级为 nprogress
- 简化会话验证，服务器端无需单独设置 cookie 标识
- 去除下次自动登录功能
- 登录／退出接口分别修改为 `user/login` / `user/logout`

>- [react-router 2.x 升级日志](https://github.com/ReactTraining/react-router/blob/master/upgrade-guides/v2.0.0.md#changes-to-thiscontext)
- 服务器端响应非 Ajax 数据接口请求时，如果 session 失效，请重定向到 '/login'


## v1.0.3

`2016-11-01`

- 修复 `npm run theme` 失效的问题
- 修复 .gitignore 未生成的问题
- 优化 Layout 组件渲染
- 修复 pace 模块依赖丢失问题
- 更新模版 README，包括基本的安装、部署说明等
- 修复线上环境打包后入口 js 文件名错误的问题


## v1.0.0

`2016-10-13`

- 第一个公开版本
