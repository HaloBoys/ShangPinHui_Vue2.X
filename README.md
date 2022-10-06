# 尚品汇

项目地址：https://github.com/HaloBoys/ShangPinHui_Vue2.X

## 项目开发流程

1. 书写静态页面（HTML + CSS)
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成相应的动态业务逻辑

## 初始化

### 初始化目录结构

```
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
```

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

# 路由/非路由组件

路由组件与非路由组件的区别？
1. 路由组件一般放置在 pages|views 文件夹，非路由组件一般放置components文件夹中
2. 路由组件一般需要在 router 文件夹中进行注册（使用的即为组件的名字）,非路由组件在使用的时候，一般都是以标签的形式使用
3. **注册完路由，不管路由路由组件、还是非路由组件身上都有 `$route` 、 `$router` 属性**

## 非路由组件

1. Header
2. Footer

![20220926171028](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220926171028.png)

### Footer 组件显示与隐藏

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

# 接口相关

http://gmall-h5-api.atguigu.cn

http://39.98.123.211:8510

## Axios 二次封装

利用axios的**拦截器**进行封装:（主要利用请求拦截器和响应拦截器）

```javascript
// src/api/request.js

import axios from 'axios';
// 1. 利用axios对象的方法create,去创建一个axios实例
const service = axios.create({
  // 基础路径(发请求的时候，路径当中会出现api)
  baseURL: '/api',
  // 请求超时的时间 5S 
  timeout: 5000,
});

// 2. 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
service.interceptors.request.use(config => {
  return config;
})

// 3. 响应拦截器：所有的请求在响应之后都会走这个
service.interceptors.response.use(
  // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  (res) => {
    return res.data;
  }, (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
  })
export default service;
```

## API 的统一管理

小项目：完全可以在组件的生命周期函数中发请求
大项目：API 统一管理


## nprogress

[nprogress](https://github.com/rstacruz/nprogress) 可以实现请求加载效果，在项目axios 请求拦截器中调用。

## Vuex

本项目中采用 Vuex 的模块式（moudles）开发(便于维护)

1. 将项目中每个模块所用到的 vuex 隔离成多个文件（小仓库），每个文件（小仓库）都有自己的 **state mutations actions getters**
2. 将抽离出来的文件使用`moudles:{//...}`合并到大仓库中

## Mockjs

[Mockjs](http://mockjs.com/) 用于生成随机数据，**拦截 Ajax 请求**，通过随机数据，模拟各种场景。

使用步骤：

1. 在项目 `src` 文件夹中创建 `mock` 文件夹
2. 准备JSON数据 mock 文件夹中创建相应的 `JSON 文件`
3. mock 数据需要的图片放置到 `public` 文件夹中（public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中）
4. 在 `mock` 文件夹中创建 `mockServer.js`（通过 mockjs 模块模拟虚拟数据）
```javascript
// mockServer.js

import Mock from 'mockjs'

// 引入 JSON 文件（JSON 文件不需要对外暴露即可引入）
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner", {
  code: 200,
  data: banner
})

Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})
```
5. mockServer.js 在入口文件（main.js）中引入
6. 对 axios 二次封装（同以前的封装步骤），唯一区别：`baseURL: '/mock',`
7. 在 `api/index.js` 中引入封装的 axios: `import mockAjax from './mock'`，通过 mockAjax 写接口：
```javascript
// API 统一管理
import mockAjax from './mock'

// getBannerList

export const getBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get"
  })
}
```
8. 通过 vuex 调用接口，请求数据，存储数据。


# 插件相关

## Swiper

安装：

```bash
npm install swiper@5
```

基本使用：

> 官方文档: https://www.swiper.com.cn/usage/index.html

1. 引包（js & css）
   1. js 文件在组件中引入：`import Swiper from "swiper"`
   2. 如果让所有组件都可用，可以在 `main.js` 文件中引入**样式文件**: `import "swiper/css/swiper.css"`
2. 复制页面结构（不要更改类名）
3. new Swiper 实例（**必须有结构**） 

问题：

直接在 mounted 生命周期中 new swiper 实例没有结构的问题：(v-for 遍历在组件自身)
解决方案：watch + nextTick

1. 使用 watch 监听 bannerList 数据的变化（当服务器请求回来之后数据就会发生变化）
2. 在 watch 回调函数中调用组件 nextTick 方法，在 nextTick 中 new Swiper 实例

# 静态组件拆分

## 全局组件

规范：所有的全局组件放到 components 文件夹中。

### TypeNav

TypeNav 三级联动组件因为要在多个组件中使用，所以注册为全局组件

![20220927145257](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927145257.png)

#### TypeNav 获取数据动态渲染

注意此处获取数据（跨域问题）然后使用 vuex （这个步骤繁琐点）存储数据，获取到了数据直接使用 v-for渲染即可

跨域问题解决：使用 devserver 代理跨域

```javascript
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': { 
        target: 'http://gmall-h5-api.atguigu.cn', // 代理目标的基础路径
        // changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
```

#### TypeNav 一级分类动态添加背景颜色

1. 使用 CSS 伪类
2. 使用 JS 实现

使用 JS 实现:

1. 鼠标移入获取每个 item 的 index 并保存在 data 下的 currentIndex 变量中
2. 给每个被移入的 item 添加 current 类名：`:class="{ current: currentIndex == index ? 'current' : '' }"`
3. 鼠标离开时，将 currentIndex 的值改为 -1

#### TypeNav 二三级分类的显示与隐藏

默认是使用 CSS 来控制显示与隐藏的，这里使用 JS 写法控制二三级分类显示与隐藏：

`:style="{ display: currentIndex == index ? 'block' : 'none' }"`

#### 函数防抖与节流

防抖：前面的所有的触发都**被取消**，最后一次执行在规定的时间之后才会触发，也就是说如果**连续快速的触发只会执行一次**
节流：在规定的**间隔时间范围内**不会重复触发回调，**只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发**

解决方案：

[lodashjs](https://www.lodashjs.com/) 已经封装好了防抖（_.debounce）与节流（_.throttle）函数

#### TypeNav 节流

1. 按需引入 lodash `import throttle from "lodash/throttle"`
2. 三级联动配置节流效果：
```javascript
// TypeNav 节流(throttle 函数不要写成箭头函数)
getCurrentIndex: throttle(function (index) {
   this.currentIndex = index;
}, 16),
```

#### TypeNav 路由跳转与传递参数【重要】

路由跳转：

1. 声明式导航：router-link 【可以实现，但是出现卡顿现象。因为 router-link 是一个组件，当服务器的大量数据返回之后，需要循环出很多的 router-link 组件，会非常消耗内存。】
2. 编程式导航：$router.push | replace【推荐：事件委派 + 编程式导航方案。】

使用事件委派存在问题：

1. 如何判断点击的一定是 a 标签。
   - 解决方案：
   - 为所有 a 标签加上一个指定 **自定义属性**，其余的节点没有。
   - 在事件回调中拿到事件对象。
   - 通过事件对象元素的 `dataset` 属性获取节点上文定义的自定义属性**进行判断**。
2. 如何判断是一级分类二级分类还是三级分类的 a 标签。
   - 解决方案：
   - 同样为所有 a 标签（一级分类二级分类三级分类）加上指定的 **自定义属性**
   - 通过事件对象元素的 `dataset` 属性获取节点上文定义的自定义属性**进行判断**。

代码实现：

```javascript
goSearch(event) {
 let element = event.target;
 // 解构出属性，简化下面 if 语句
 let { categoryname, category1id, category2id, category3id } = element.dataset;
 if (categoryname) {
   // 整理路由跳转参数
   let location = { name: "search" };
   let query = { categoryName: categoryname };
   if (category1id) {
     query.category1Id = category1id;
   } else if (category2id) {
     query.category2Id = category2id;
   } else {
     query.category3Id = category3id;
   }
   // 参数整理完毕
   location.query = query;
   // 路由跳转
   this.$router.push(location);
 }
}
```

#### TypeNav 分类显示与隐藏

在非 home 组件中：TypeNav 默认是隐藏的，并有鼠标移入移出显示隐藏效果（过渡动画）：

1. 在 TypeNav 组件 data 中定义变量默认为 true，使用 v-show 控制 TypeNav 分类显示与隐藏。
2. 由于每次引用 TypeNav 组件都会创建一个 TypeNav 实例。
3. 在 TypeNav 组件 mounted 生命周期函数中判断（`this.$route.path!='/home'`）当前组件是否为非 home 组件，如果是则让变量变为 false。
4. 非 home 组件中TypeNav 分类添加鼠标移入移出显示与隐藏效果：
   1. 移入：变量为 true（更改变量前同样做路径判断）
   2. 移出：变量为 false（更改变量前同样做路径判断）

过渡动画：

鸽一下... 这部分忘完了。。

#### TypeNav 接口请求优化

由于每次加载创建 TypeNav 组件都会发送请求请求数据，而这些数据没有必要重复请求。所以把这个调用放在 App 根组件中调用:（App 根组件只执行一次）

```javascript
// App.vue

mounted() {
 this.$store.dispatch("getTypeNavList");
}
```
#### TypeNav 路由合并参数

解决 params 参数和 query 参数只能传递一个的情况：

解决方案：跳转前先判断路由中是否有 params 或 query 参数，如果有直接合并一起发送

1. 在 TypeNav 组件中判断是否有 params 参数，如果有就合并
```diff
# TypeNav.vue
goSearch(event) {
  let element = event.target;
  // 解构出属性，简化下面 if 语句
  let { categoryname, category1id, category2id, category3id } =
    element.dataset;
  if (categoryname) {
    // 整理路由跳转参数
    let location = { name: "search" };
    let query = { categoryName: categoryname };
    if (category1id) {
      query.category1Id = category1id;
    } else if (category2id) {
      query.category2Id = category2id;
    } else {
      query.category3Id = category3id;
    }
+    if (this.$route.params) {
+      location.params = this.$route.params;
      // 参数整理完毕
      location.query = query;
      // 路由跳转
      this.$router.push(location);
    }
  }
},
```
2. 在 Header 组件中判断是否有 query 参数，如果有就合并
```diff
# Header.vue

searchInfo() {
-  this.$router.push({
-    name: "search",
-    params: {
-      keyword: this.keyword,
-    },
-  });
  // 合并参数：
+  if (this.$route.query) {
+    let location = {
+      name: "search",
+      params: {
+        keyword: this.keyword,
+      },
+    };
+    location.query = this.$route.query;
+    console.log(location);
+    this.$router.push(location);
+  }
},
```

### Pagination (分页器)

#### Pagination 静态组件

```html
<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>9</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
```

#### Pagination 相关属性

1. PageNo: 当前页数
2. PageSize: 每一页展示多少条数据
3. Total: 一共多少条数据
4. TotalPage: 一共多少页【 Math.ceil(Total / PageSize) 计算属性，向上取整 】
5. Continues: 分页连续页码个数【5|7】因为奇数是对称的，如：3 4 5 6 7

#### Pagination 实现思路

1. 分页起始数字和结束数字算法：(定义计算属性，计算出连续的页码（Continues）的**起始数字（start）**与**结束数字(end)**【连续页码数字至少是 5】)
   1. 当 Continues > TotalPage （总页数没有连续页码多）
      1. start = 1
      2. end = TotalPage
   2. 当 Continues < TotalPage （总页数比连续页码多）
      1. start = PageNo - parseInt(Continues/2)
      2. end = PageNo + parseInt(Continues/2)
   3. 起始数字（start）与结束数字(end) 不正常的现象：
      1. 当 start < 0 时，解决方案：
         1. start = 1
         2. end = Continues
      2. 当 end > TotalPage (end 大于总页码) 解决方案：
         1. end = TotalPage
         2. start = TotalPage - Continues
2. 分页器动态展示页码
   1. v-for 遍历页码 end 数字，只有当元素 > start 时才展示
   2. 顶端`上一页`页码的禁用：当 PageNo = 1 时
   3. 顶端`1`页码的显示与隐藏：当 start > 1 时，顶端1页码显示，否则隐藏
   4. 顶端`...`页码的显示与隐藏: 当 start > 2 时，顶端`...`页码显示，否则隐藏
   5. 底部`下一页`页码的禁用：当 PageNo = TotalPage 时
   6. 底部`总`页码的显示与隐藏：当 end < TotalPage 时，底部`总`页码的显示，否则隐藏
   7. 底部`...`页码的显示与隐藏: 当 end < TotalPage - 1 时，底部`...`页码显示，否则隐藏
3. 绑定服务器数据
   1. 相关属性绑定：
      1. PageNo: searchParams.pageNo
      2. PageSize: searchParams.pageSize
      3. Total: 在 vuex 中获取
      4. Continues: 5
   2. 页码点击数据传递（自定义事件）
      1. 顶端`上一页`页码点击：传递 PageNo - 1
      2. 顶端`1`页码点击：传递  1
      3. `连续页码`点击：传递被点击的页码数
      4. 底部`下一页`点击：：传递 PageNo + 1
      5. 底部`总`页码点击：传递总页码
   3. 整理传递过来的数据，重新发送请求
4. 分页器添加类名
   1. 顶端`1`：`:class = { active:PageNo == 1 }`
   2. 连续页码：`:class = { active:PageNo == page }`
   3. 底部`总`页码：`:class = { active:PageNo == TotalPage }`

## Home

### ListContainer

![20220927151117](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927151117.png)

数据：使用 Mock.js 模拟

轮播图插件：Swiper

### Recommend

![20220927151452](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927151452.png)

### Rank

![20220927154535](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927154535.png)

### Like

![20220927154556](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927154556.png)

### Floor

![20220927154616](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927154616.png)

数据：使用 Mock.js 模拟

通过 Vuex 存储数据，然后在 Home 组件中发送 action（Home 组件中有两个 Floor 组件）

1. 发送 action 得到 getFloorList 数据
2. 在组件 `<Floor>` 上使用 v-for 基于getFloorList 数据渲染

问题：

为什么在 Floor 组件中可以直接在 mounted 钩子中 new Swiper 实例？

因为 v-for 是在 Home 组件（Floor 的父组件）上进行遍历的，所以遍历完成之后，子组件可以接收到结构。

### Brand

![20220927154629](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20220927154629.png)

## Search

请求地址: /api/list
请求方式: POST
请求参数：需要参数

参数示例：
```
{
 "category1Id": "",
 "category2Id": "",
 "category3Id": "61",
 "categoryName": "手机",
 "keyword": "小米",
 "order": "1:desc",
 "pageNo": 1,
 "pageSize": 10,
 "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
 "trademark": "4:小米"
}
```

### Search 接口参数传递

Search 接口请求次数根据参数的不同而返回不同的数据，所以可以把派发 action 的行为写成一个函数（函数声明一次可以多次调用）

1. 封装 getData 函数，在函数内部派发 action
```javascript
methods:{
  getData(){
    // 携带的参数为data中响应式的对象
    this.$store.dispatch('getSearchList',this.searchParams);
  }
}
```
2. 在 mounted 生命周期函数中调用一次 getData 函数
3. 派发 action 所携带的参数，在 data 中定义成一个响应式的数据对象：`searchParams`
```javascript
data(){
  return {
    searchParams:{
      "category1Id": "",
      "category2Id": "",
      "category3Id": "",
      "categoryName": "",
      "keyword": "",
      "order": "",
      "pageNo": 1,
      "pageSize": 10,
      "props": [],
      "trademark": ""
    }
  }
}
```
4. 在 mounted 生命周期函数之前（`beforeMount`）整理一次 `searchParams` 对象。在 beforeMount 生命周期函数中可以通过 `this.$route.query.xxx` 获取到路由中的参数，通过 `Object.assign` 方法合并参数（合并完成之后再触发第二步中的 mounted 生命周期函数根据参数获取数据）
```javascript
beforeMount(){
  Object.assign(searchParams,this.$route.query,this.$route.params)
}
```
5. 现存问题：接口请求只能在 mounted 生命周期中发送一次。解决方案：
使用 watch 监听路由变化，当路由发生变化的时候通过 `Object.assign` 方法再次合并参数，并重新发送请求。
优化：防止上次搜索数据遗留，搜索之后应该将 id 重置
```javascript
watch: {
 $route() {
   Object.assign(this.searchParams, this.$route.params, this.$route.query);
   this.getData();
   // 优化: 防止上次搜索数据遗留，搜索之后应该将 id 重置
   this.searchParams.category1Id = "";
   this.searchParams.category2Id = "";
   this.searchParams.category3Id = "";
 }
}
```

### 面包屑导航

![20221004142335](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20221004142335.png)

处理 query 参数: (TypeNav 中传递的数据)

1. 显示与隐藏 & 面包屑中的数据: 根据 searchParams 中的 categoryName 来控制
2. 面包屑导航点击关闭事件
   1. 将 searchParams 中的 categoryName 设置为 undefined 
   2. 重新发送请求
3. 关闭面包屑导航后清空浏览器地址栏
   1. 通过编程式导航,自己跳转自己,即可清空地址栏的查询参数.
   2. 需要判断路由中是否有 params 参数,如果有则需要带着参数一起跳转

处理 param 参数: (Header 组件搜索框传递的数据)

1. 显示与隐藏 & 面包屑中的数据: 根据 searchParams 中的 keyword 来控制
2. 面包屑导航点击关闭事件
   1. 将 searchParams 中的 keyword 设置为 undefined 
   2. 重新发送请求
3. 关闭面包屑导航后清空浏览器地址栏
   1. 通过编程式导航,自己跳转自己,即可清空地址栏的查询参数.
   2. 需要判断路由中是否有 query 参数,如果有则需要带着参数一起跳转
4. 清空 Header 组件搜索框的数据: (全局事件总线)
   1. 安装全局事件总线
   2. 面包屑导航点击关闭事件处理函数中发送事件
   3. Header 组件中监听事件,并将搜索框的数据清空

### 排序功能（后端排序）

排序方式 ： 1: 综合,2: 价格 asc: 升序,desc: 降序（示例: "1:desc"）

实现思路：

1. 综合 & 价格 active 样式：
   1. 根据 searchParams 中 order 属性控制
   2. 动态为元素绑定样式：通过字符串 indexOf 方法判断 data 中 order 属性是否包含对应标识：
    ```javascript
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    ```
2. 综合 & 价格 图标（iconfont）样式：
   1. 在 iconfont 选择图标，添加到项目（项目中引入在线链接，通过类名应用图标）
   2. 图标是否显示的判断：（同样根据 active 中的计算控制）
   3. 上下图标的样式动态绑定：（根据 searchParams 中 order 属性 `asc or desc` 控制）
    ```html
    class="iconfont"
    :class="{
      'icon-direction-down': isDesc,
      'icon-direction-up': isAsc,
    }"
    ```
    ```javascript
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ```
3. 综合 & 价格 点击逻辑：
   1. 绑定同一个回调函数，点击对应元素，传递参数：
      1. 综合传递 `1` 价格 传递 `2`
   2. 排序逻辑：
    ```javascript
    orderClickHandler(flag) {
      let originType = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];

      let newOrder = "";

      if (originType == flag) {
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    ```

### SearchSelector 组件(Search 子组件)

![20221003143150](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20221003143150.png)

数据通过 vuex getters 简化，在组件中通过 ...mapGetters 获取：

```javascript
...mapGetters(["trademarkList", "attrsList"]),
```

#### 品牌单击筛选功能

技术：组件通信 + 合并参数

实现思路：

1. 给品牌列表绑定事件,单击品牌信息将被点击的品牌对象传递给事件回调
2. 通过**自定义事件**将品牌对象传递给Search父组件
3. 父组件中接收到品牌对象,将data中的数据合并,并重新请求数据
4. 添加品牌面包屑导航:
   1. 显示与隐藏 & 面包屑中的数据: 根据 searchParams 中的 trademark 来控制(注意此处的数据需要处理下)
   2. 面包屑导航点击关闭事件
      1. 将 searchParams 中的 trademark 设置为 `""` (如果设置为 undefined 则需要用 `v-if` 控制显示与隐藏)
      2. 重新发送请求

#### 售卖属性筛选功能

技术：组件通信 + 合并参数

实现思路：

1. 给售卖属性绑定事件,单击售卖属性将被点击的属性对象传递给事件回调
2. 通过**自定义事件**将售卖属性传递给Search父组件。数据传递格式：`["属性ID:属性值:属性名"]`
3. 父组件中接收到售卖属性,将data中的数据合并,并重新请求数据
   1. 数组去重（防止多次点击）
4. 添加品牌面包屑导航:
   1. 显示与隐藏 & 面包屑中的数据: 根据 searchParams 中的 props 数组来控制
   2. 面包屑个数由 props 数组循环渲染
   3. 面包屑导航点击关闭事件
      1. 被点击的导航传递 index 索引，回调函数中删除 props 数组中对应的索引:`splice 方法`
      2. 重新发送请求

## Login

## Register

## Detail

![20221006165905](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20221006165905.png)

### Detail 跳转参数传递

跳转 detail 组件需要携带params 参数（产品 id 作为标识）

1. detail 组件中需要占位
```javascript
{
  path: "/detail/:skuid",
  component: Detail,
  meta: {
    showFooter: true
  }
}
```
2. 在 search 组件中点击商品图片进行跳转：router-link + 动态传递参数
```html
<router-link :to="`/detail/${item.id}`">
  <img :src="item.defaultImg" />
</router-link>
```

### Detail 路由跳转滚动行为

> 路由滚动行为：https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html

设置点击商品图片跳转到详情页，自动滚动到顶部：

```javascript
const router = createRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})
```

### Detail 组件获取服务器数据并渲染

1. 接口相关：
   1. 请求地址 & 参数：/api/item/{ skuid }
   2. 请求方式：Get
2. Vuex 新建 detail 模块
3. Detail 组件调用 vuex 并传递 skuid 获取数据
