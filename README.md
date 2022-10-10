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

计算总页数(根据已知条件): 

```javascript
computed: {
  // 总页数
  totalPage() {
    return Math.ceil(this.total / this.pageSize);
  },
}
```

连续页码实现思路: 

1. 定义计算属性，并定义连续的页码（continues）的**起始数字（start）**与**结束数字(end)**
2. 当总页数没有连续页码多
   1. start = 1
   2. end = totalPage
3. 当总页数比连续页码多
   1. start = this.pageNo - parseInt(this.continue / 2);
   2. end = this.pageNo + parseInt(this.continue / 2);
4. 纠正不正常的两种情况：
   1. start < 1 
      1. start = 1;
      1. end = this.continue;
   2. end > totalPage
      1. end = this.totalPage;
      2. start = this.totalPage - this.continue + 1;

分页 UI 渲染相关: 

使用 v-for 遍历页码结束数字 end ，且只有当元素 >= start 时才展示

相关按钮的显示与隐藏逻辑: 

1. 顶端`上一页`页码的禁用：当 pageNo = 1 时
2. 顶端`1`页码的显示与隐藏：当 start > 1 时，顶端 1 页码显示，否则隐藏
3. 顶端`...`页码的显示与隐藏: 当 start > 2 时，顶端`...`页码显示，否则隐藏
4. 底部`下一页`页码的禁用：当 pageNo = totalPage 时
5. 底部`...`页码的显示与隐藏: 当 end < totalPage - 1 时，底部`...`页码显示，否则隐藏
6. 底部`总`页码的显示与隐藏：当 end < totalPage 时，底部`总`页码的显示，否则隐藏

按钮类名绑定: 

1. 顶端`1`：`:class = { active:pageNo == 1 }`
2. 连续页码：`:class = { active:pageNo == page }`
3. 底部`总`页码：`:class = { active:pageNo == totalPage }`

按钮点击传递页码: 

在按钮点击的回调函数中将传递过来的页码赋值给 pageNo

1. 顶端`上一页`页码点击：传递 pageNo - 1
2. 顶端`1`页码点击：传递  1
3. `连续页码`点击：传递被点击的页码数
4. 底部`下一页`点击：：传递 pageNo + 1
5. 底部`总`页码点击：传递总页码

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

### Detail 组件获取服务器数据

1. 接口相关：
   1. 请求地址 & 参数：/api/item/{ skuid }
   2. 请求方式：Get
2. Vuex 新建 detail 模块
3. Detail 组件调用 vuex 并传递 skuid 获取数据

### Detail 组件售卖属性相关

#### 售卖属性数据

通过 vuex getters 简化，使用 v-for 渲染

```javascript
spuSaleAttrList(state) {
  return state.detailItem.spuSaleAttrList || [];
}
```

#### 售卖属性点击功能

![售卖属性](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/%E5%94%AE%E5%8D%96%E5%B1%9E%E6%80%A7.gif)

点击高亮（排他思想）

通过元素对象身上 `isChecked` 属性决定当前元素是否被选中。

```javascript
methods: {
 /* 
   1. spuSaleAttrVal: 被点击的元素对象
   2. spuSaleAttrValueList: 被点击的元素对象所在的数组
 */
 saleAttrClickHandler(spuSaleAttrVal, spuSaleAttrValueList) {
   // 排他思想
   spuSaleAttrValueList.forEach((element) => {
     element.isChecked = 0;
   });
   spuSaleAttrVal.isChecked = 1;
 },
},
```

### Detail 组件商品数量操作

1. 加减按钮
2. 用户输入
   1. 输入不合法
   2. 输入 < 0
   3. 输入为小数

```html
<div class="controls">
  <input
    autocomplete="off"
    class="itxt"
    v-model="goodsCount"
    @change="itxtChange"
  />
  <a href="javascript:" class="plus" @click="goodsCount++">+</a>
  <a
    href="javascript:"
    class="mins"
    @click="goodsCount > 1 ? goodsCount-- : (goodsCount = 1)"
    >-</a
  >
</div>
```

```javascript
itxtChange(event) {
  let count = event.target.value * 1;
  if (isNaN(count)) {
    this.goodsCount = 1;
  } else if (count <= 1) {
    this.goodsCount = 1;
  } else {
    this.goodsCount = parseInt(count);
  }
},
```

### Detail 加入购物车功能

BUG: 商品的购买属性在购物车中不能显示的问题。

1. 发请求（点击购物车按钮发送请求，将当前产品及数量发送至服务器）
   1. 编写请求接口（reqAddOrUpdateShopCar），接收两个参数：skuid skunum
   2. vuex 中编写 action （addOrUpdateShopCar）
   3. 点击按钮触发 action
2. 服务器存储成功之后，路由跳转 addCartSuccess 组件
   1. 接收 vuex 中接口返回的状态
      1. addOrUpdateShopCar 返回的是一个 Promise
      2. 成功返回 ok
      3. 失败返回 Error 实例
   2. 点击事件中 try catch 
   3. 如果成功，跳转 addCartSuccess 组件并携带产品信息

### Detail 加入购物车并跳转 addCartSuccess 组件

1. 参数传递（当前商品对象）
   1. query 传递【不推荐，地址栏太乱】
   2. 本地存储（sessionStorage）
      1. 只通过 params 携带产品个数
      2. 商品对象存储在 sessionStorage 中
2. 数据绑定

### Zoom（放大镜组件）

#### 展示数据

在 Detail 组件中通过 props 将图片数据传递给 Zoom 组件

问题：请求还没有回来的时候传递过去的是 undefined 导致控制台报错 解决方案：

1. 方法一：通过计算属性进行判断，如果是 undefined 则返回一个空数组：
```javascript
skuImageList() {
  // 数据为 undefined 返回 [] 防止控制台报错
  return this.skuInfo.skuImageList || [];
},
```
2. 方法二：在子组件中接收 props (并设置默认值)
```javascript
props: {
  skuImageList: {
    default() {
      return [];
    },
  },
},
```

#### 放大镜效果

![放大镜效果](https://cdn.jsdelivr.net/gh/HaloBoys/PicGoMyDevice/img/202210080044466.gif)

1. 给容器绑定鼠标移动事件，并在处理函数中计算出 mask 的位移
   1. left
   2. top
2. 处理边界情况
3. bigImg 二倍

```javascript
moveHandler(event) {
  let mask = this.$refs.mask;
  let bigImg = this.$refs.bigImg;

  let left = event.offsetX - mask.offsetWidth / 2;
  let top = event.offsetY - mask.offsetHeight / 2;

  // 处理边界(注意是在赋值之前判断)
  if (left <= 0) left = 0;
  if (left >= mask.offsetWidth) left = mask.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= mask.offsetHeight) top = mask.offsetHeight;

  mask.style.left = left + "px";
  mask.style.top = top + "px";

  // 右侧大图
  bigImg.style.left = -2 * left + "px";
  bigImg.style.top = -2 * top + "px";
}
```

### ImageList（小轮播组件）

数据：和 Zoom 放大镜组件使用同一份数据

#### Swiper

```javascript
watch: {
 skuImageList: {
   handler() {
     this.$nextTick(() => {
       new Swiper(".swiper-container", {
         // 如果需要前进后退按钮
         navigation: {
           nextEl: ".swiper-button-next",
           prevEl: ".swiper-button-prev",
         },
        //  https://www.swiper.com.cn/api/grid/491.html
         slidesPerView: 5,
       });
     });
   },
 },
},
```

#### 轮播点击功能

高亮效果: 动态添加类名

1. 在 data 中设置变量 curIndex 初始化数据
2. 轮播图片被点击，传递 index 参数给回调函数
3. 回调函数中将 data 中 curIndex 设置为 index

Zoom 组件跟随效果：

通过全局事件总线将 index 传递给 Zoom 兄弟组件（作为Zoom组件数组图片索引，他们共用的是同一份数据）

## AddCartSuccess

![20221008152609](https://raw.githubusercontent.com/HaloBoys/PicGoMyDevice/main/img/20221008152609.png)

### 查看商品详情

使用 router-link 跳转到当前商品 detail 页面，id: skuObj.id

```html
<router-link :to="`/detail/${getSkuObj.id}`" class="sui-btn btn-xlarge">
  查看商品详情
</router-link>
```

### 去购物车结算

使用 router-link 跳转到 ShopCart 购物车页面

## ShopCart

### 获取购物车信息

1. 编写请求接口
2. vuex 三连

### uuid 临时游客身份

需要在发送请求的时候在请求头中携带 userTempId 字段，之后再请求购物车信息的时候，必须有这个 id 才能获取到临时购物车数据

1. 在 detail 的 vuex store 中定义 uuid_token
2. 创建 utils 文件夹，并定义一个工具函数，用于返回 uuid 注意这个 id 只能生成一个（单例模式）
```javascript
import {
  v4 as uuidv4
} from 'uuid';

export const genUuid = () => {
  let uuid_token = window.localStorage.getItem("UUIDTOKEN");
  // 如果本地没有，生成一个并存储到本地，如果有，直接返回本地的id
  if (!uuid_token) {
    uuid_token = uuidv4()
    window.localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token
}
```

### 请求数据并渲染

1. 在购物车组件mounted生命周期中请求接口（因为请求接口频繁调用，所以封装成一个methods:getData）
2. 循环渲染数据

### 商品数量加减操作

加/减/用户输入购物车中的数量都要发请求：

接口：/api/cart/addToCart/{ skuId }/{ skuNum }（addOrUpdateShopCar）
参数：skuId  skuNum（正数代表增加，负数代表减少）

1. 加/减/用户输入 派发同一个 action, 根据传递的参数来区分：
   1. type：操作类型
   2. disNum：增加or减少
   3. cart：操作对象
2. 根据参数发送请求
   1. 节流操作：解决用户点击太快会出现负数

```javascript
countHandler(flag, disnum, target) {
  if (flag) {
    if (flag == "sub") {
      if (target.skuNum > 1) {
        disnum = -1;
      } else {
        disnum = 0;
      }
    } else if (flag == "add") {
      disnum = 1;
    } else if (flag == "mod") {
      if (isNaN(disnum) || disnum < 1) {
        // 用户输入的数字非法
        disnum = 0;
      } else {
        // 用户输入（正常情况）或者输入的是小数（parseInt）
        disnum = parseInt(disnum) - target.skuNum;
      }
    }
  }
  // 向服务器发请求
  try {
    this.$store.dispatch("addOrUpdateShopCar", {
      skuid: target.skuId,
      skunum: disnum,
    });
    this.getData();
  } catch (error) {
    alert(error.message);
  }
}
```

### 商品删除操作

请求地址：/api/cart/deleteCart/{skuId}
请求方式：DELETE

```javascript
// api
export const reqDelCartList = (skuid) => {
  return service({
    url: `/cart/deleteCart/${skuid}`,
    method: "delete",
  })
}
```

```javascript
// vuex
async delCartList(context, skuid) {
  const res = await reqDelCartList(skuid);
  if (res.code == 200) {
    return 'ok'
  } else {
    return Promise.reject(new Error('delete fail!'))
  }
}
```

```javascript
// shopcart.vue
// 删除购物车商品
async deleteGoods(skuId) {
  try {
    await this.$store.dispatch("delCartList", skuId);
    this.getData();
  } catch (error) {
    alert(error.message);
  }
},
```

### 商品选中状态修改

```javascript
// api
export const reqUpdateCartChecked = (skuid, checknum) => {
  return service({ 
    url: `/cart/checkCart/${skuid}/${checknum}`,
    method: "get",
  })
}
```

```javascript
// vuex
async updateCartChecked(context, {
  skuid,
  checknum
}) {
  const res = await reqUpdateCartChecked(skuid, checknum);
  if (res.code == 200) {
    return 'ok'
  } else {
    return Promise.reject(new Error('update fail!'))
  }
}
```

```javascript
// shopcart.vue
// 商品选中状态修改
async changeChecked(skuid, event) {
  let checknum = event.target.checked ? "1" : "0";
  try {
    await this.$store.dispatch("updateCartChecked", {
      skuid: String(skuid),
      checknum,
    });
    this.getData();
  } catch (error) {
    alert(error.message);
  }
},
```

### 删除选中的商品

接口：复用删除单个商品的接口

1. 点击删除选中的商品按钮，不传递参数，直接触发一个 action
2. 在这个 action 中再次触发删除单个商品的 action

```javascript
// vuex
// 删除所有选中项 action
deleteAllCheckedGoods(context) {
 let cartInfoList = context.getters.cartList.cartInfoList;
 let promiseState = [];
 cartInfoList.forEach(item => {
   // 返回的是一个 Promise
   let res = item.isChecked == 1 ? this.dispatch('delCartList', item.skuId) : "";
   promiseState.push(res)
 })
 return Promise.all(promiseState);
}
```

```javascript
// shopcart.vue
// 删除所有选中商品
async deleteAllCheckedGoods() {
  try {
    await this.$store.dispatch("deleteAllCheckedGoods");
    this.getData();
  } catch (error) {
    alert(error.message)
  }
},
```

### 全选反选操作

1. 派发 action 传递复选框状态
2. action context 中获取所有购物车列表，将状态都改为传递过去的状态