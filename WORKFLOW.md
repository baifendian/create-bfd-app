# 工作流程


## 项目构建

### 安装 [Node.js](https://nodejs.org/en) (6.x+)

安装后会集成 npm 包管理工具，为了加快安装速度，设置国内镜像

```sh
$ npm config set registry https://registry.npm.taobao.org
```

### 安装脚手架

```sh
$ npm install -g create-bfd-app
```

### 生成项目

```sh
$ cd workspace

$ create-bfd-app my-app
```


## 开发

```sh
cd my-app

npm start
```

到此为止，前端环境配置完成，[http://localhost:9000](http://localhost:9000)


## 部署测试/上线

### 代码规范检查

代码规范参考 [airbnb](https://github.com/airbnb/javascript)

```sh
cd myapp

npm run lint
```

### 构建线上环境代码

```sh
cd myapp

npm run build
```

完成后，myapp 下的 static 目录及 index.html 发送给后台即可，如 Java web 项目下的 webapp 目录

### 修改服务器配置

脚手架采用 browser history 控制 URL，服务器也需要做相应的配置。