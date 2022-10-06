import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import TypeNav from '@/components/TypeNav/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import "@/mock/mockServer.js"

Vue.use(VueRouter);
// 全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Pagination", Pagination);

Vue.config.productionTip = false;

import router from './router/index';

new Vue({
  render: h => h(App),
  router,
  store,
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')