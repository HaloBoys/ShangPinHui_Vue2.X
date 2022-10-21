import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import TypeNav from '@/components/TypeNav/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import "@/mock/mockServer.js"
// 统一接口管理中的所有 API 接口
import * as API from "@/api"
// Element-UI
import {
  MessageBox
} from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// VueLazyload 图片懒加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/images/lazy.gif'
// vee-validate 表单验证插件
import '@/plugins/validate'

// 注册相关插件
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  loading: loadimage
})

// 全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

import router from './router/index';

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this;
    // vuex 中所有 API 接口【现在所有 vue 实例都可以通过 this.$API.xxx 发请求】
    Vue.prototype.$API = API;
  }
}).$mount('#app')