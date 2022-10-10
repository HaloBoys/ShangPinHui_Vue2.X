// 引入Vue核心库
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 全局引入 swiper 样式文件
import "swiper/css/swiper.css"
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

//创建并暴露store
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart
  }
})