<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // TypeNav 接口请求优化：由于每次加载创建 TypeNav 组件都会发送请求请求数据，而这些数据没有必要重复请求。所以把这个调用放在 App 根组件中调用。
    this.$store.dispatch("getTypeNavList");
  },
};
</script>

<style>
</style>