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

# 路由/非路由组件

路由组件与非路由组件的区别？
1. 路由组件一般放置在 pages|views 文件夹，非路由组件一般放置components文件夹中
2. 路由组件一般需要在 router 文件夹中进行注册（使用的即为组件的名字）,非路由组件在使用的时候，一般都是以标签的形式使用
3. **注册完路由，不管路由路由组件、还是非路由组件身上都有 `$route` 、 `$router` 属性**

## 非路由组件

1. Header
2. Footer

![20220926171028](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220926171028.png)

Footer 组件的显示与隐藏：

只有当 Home、Search 组件显示时 Footer 组件才显示，否则隐藏。

方案一：通过路径判断：（不推荐）

```html
<Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer>
```

方案一：利用路由元信息（推荐）

1. 在路由规则中为路由定义 meta 元信息
```javascript
routes: [{
 path: "/",
 component: Home,
 meta: {
   showFooter: true
 }
}, {
 path: "/home",
 component: Home,
 meta: {
   showFooter: true
 }
},
```
2. 在组件中根据路由 meta 元信息控制显示与隐藏
```html
<Footer v-show="$route.meta.showFooter"></Footer>
```

## 路由组件

1. Home
2. Login
3. Register
4. Search

目录存放：

components 文件夹：经常放置非路由组件（共用全局组件）
pages | views文件夹：经常放置路由组件

# 静态组件拆分

## 全局组件

### TypeNav

![20220927145257](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927145257.png)

TypeNav 三级联动组件因为要在多个组件中使用，所以注册为全局组件


## Home

### ListContainer

![20220927151117](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927151117.png)

### Recommend

![20220927151452](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927151452.png)

### Rank

### Like

### Floor

### Brand

## Login

## Register

## Search

# 接口相关

http://gmall-h5-api.atguigu.cn

http://39.98.123.211:8510

## Axios 二次封装




