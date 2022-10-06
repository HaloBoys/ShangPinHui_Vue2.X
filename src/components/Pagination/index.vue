<template>
  <div class="pagination">
    <button
      :disabled="pageNo == 1"
      @click="$emit('paginataion-click', pageNo - 1)"
    >
      上一页
    </button>
    <button
      v-if="getPaginationStartAndEnd.start > 1"
      @click="$emit('paginataion-click', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="getPaginationStartAndEnd.start > 2">···</button>

    <button
      v-for="(item, index) in getPaginationStartAndEnd.end"
      :key="index"
      v-show="item >= getPaginationStartAndEnd.start"
      @click="$emit('paginataion-click', item)"
      :class="{ active: pageNo == item }"
    >
      {{ item }}
    </button>

    <button v-if="getPaginationStartAndEnd.end < getTotalPage - 1">···</button>
    <button
      v-if="getPaginationStartAndEnd.end < getTotalPage"
      @click="$emit('paginataion-click', getTotalPage)"
      :class="{ active: pageNo == getTotalPage }"
    >
      {{ getTotalPage }}
    </button>
    <button
      :disabled="pageNo == getTotalPage"
      @click="$emit('paginataion-click', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    getTotalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    getPaginationStartAndEnd() {
      const { pageNo, total, continues, getTotalPage } = this;
      // 连续页码的 start 和 end
      let start = 0,
        end = 0;
      // 总页数没有连续页码多
      if (continues > total) {
        start = 1;
        end = continues;
        // 总页数比连续页码多
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > getTotalPage) {
        end = getTotalPage;
        start = getTotalPage - continues + 1;
      }
      return { start, end };
    },
  },
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
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
