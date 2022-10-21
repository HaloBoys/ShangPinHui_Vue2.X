import VueRouter from "vue-router";

// 一级路由
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


// vuex

import store from "@/store/index"

// 解决编程式导航多次执行报错 （NavigationDuplicated）

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

let router = new VueRouter({
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
  }, {
    path: "/detail/:skuid",
    component: Detail,
    meta: {
      showFooter: true
    }
  }, {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showFooter: true
    }
  }, {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta: {
      showFooter: true
    }
  }, {
    path: "/trade",
    name: "trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      showFooter: true
    }
  }, {
    path: "/pay",
    name: "pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      showFooter: true
    }
  }, {
    path: "/paysuccess",
    name: "paysuccess",
    component: PaySuccess,
    meta: {
      showFooter: true
    }
  }, {
    path: "/center",
    redirect: "/center/myorder",
    name: "center",
    component: Center,
    children: [{
      path: "myorder",
      name: "myorder",
      component: MyOrder,
      meta: {
        showFooter: true
      }
    }, {
      path: "grouporder",
      name: "grouporder",
      component: GroupOrder,
      meta: {
        showFooter: true
      }
    }],
    meta: {
      showFooter: true
    }
  }],
  // 路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 当切换到新路由时，滚动到顶部。
    return {
      y: 0
    }
  }
})

// 路由前置导航守卫
router.beforeEach(async (to, from, next) => {
  next();
  // 登录相关逻辑
  let token = store.state.user.token;
  let name = store.state.user.loginInfo.name;
  if (token) {
    // 已登录
    if (to.path == "/login" || to.path == "/register") {
      next('/')
    } else {
      // 登录了且有用户信息
      if (name) {
        next()
      } else {
        // 登录了没有用户信息：跳转之前获取用户信息
        try {
          await store.dispatch("autoLogin")
          next();
        } catch (error) {
          alert(error);
          // token 失效，重新登录
          await store.dispatch("logout")
          next('/login')
        }
      }
    }
  } else {
    /* 
    如果未登录
    1. 交易相关（trade)、
    2. 支付相关（pay、paysuccess)
    3. 用户中心相关（center)
    跳转到登录页面
    */
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      // 否则放行
      next()
    }
  }
})

export default router;