import VueRouter from "vue-router";

import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Login from '@/pages/Login'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function repalce(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

export default new VueRouter({
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
  }, {
    path: "/register",
    component: Register,
    meta: {
      showFooter: false
    }
  }, {
    name: 'search',
    path: "/search/:keyword?",
    component: Search,
    meta: {
      showFooter: true
    },
    // 路由组件传递 props 数据
    // 1. 布尔模式（只能传递 params 参数）
    // props: true
    // 2. 对象模式(额外传递的一些参数)
    // props: {
    //   a: 1,
    //   b: 2
    // }
    // 3. 函数模式(params 和 query 参数都可以传)
  }, {
    path: "/login",
    component: Login,
    meta: {
      showFooter: false
    }
  }]
})