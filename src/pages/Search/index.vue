<template>
  <div>
    我是 Search 组件！
    <h1>params 参数：{{ $route.params.keyword }}</h1>
    <h1>query 参数：{{ $route.query.kwd }}</h1>
  </div>
</template>

<script>
export default {
  // props: ["keyword"],
};
</script>

<style lang="less" scoped>
</style>