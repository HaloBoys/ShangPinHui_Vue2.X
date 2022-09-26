# 尚品汇

## 初始化

### 初始化目录结构

├── node_modules
├── public：存放静态资源（图片）public中的静态资源，webpack打包的时候，会原封不动打包到dist文件夹中。
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源（一般放置多个组件共用的静态资源，会被webpack当作模块打包）
│ │ └── logo.png
│ │── component: 存放组件（非路由组件&全局组件）
│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件
│ │── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件（缓存性文件）

### 关闭 Eslint

vue.config.js:

```diff
module.exports = {
+  lintOnSave:false
}
```

### 配置 @ 快捷路径

使用 `@` 表示 src 源代码目录，从外往里查找；不要使用 `../../` 从里往外查找：

1. 在项目根目录创建：`jsconfig.json`
2. 配置
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### 安装 less

注意此处要指定版本，不然不支持 vue2.x

```bash
npm install --save-dev less-loader@7 less
```

### 安装 vue-router

注意此处要指定版本，不然不支持 vue2.x

```bash
npm install vue-router@3
```


## 项目开发流程

1. 书写静态页面（HTML + CSS)
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成相应的动态业务逻辑

# 架构设计

## 非路由组件

Header

Footer

![20220926171028](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220926171028.png)

## 路由组件设计

