# 更新日志

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