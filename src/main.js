import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import TypeNav from '@/components/TypeNav/index.vue'

Vue.use(VueRouter);
// 全局组件
// 三级联动
Vue.component("TypeNav", TypeNav)

Vue.config.productionTip = false

import router from './router/index'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')