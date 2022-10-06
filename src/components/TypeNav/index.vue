<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveHandler" @mouseenter="enterHandler">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isTypeNavCatShow">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级联动 -->
            <div
              class="item"
              v-for="(v1, index) in typeNavList"
              :key="v1.categoryId"
            >
              <h3
                @mouseenter="getCurrentIndex(index)"
                :class="{ current: currentIndex == index ? 'current' : '' }"
              >
                <a
                  href="javascript:void(0)"
                  :data-categoryName="v1.categoryName"
                  :data-category1Id="v1.categoryId"
                  >{{ v1.categoryName }}</a
                >
              </h3>
              <!-- 二、三级联动 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="v2 in v1.categoryChild"
                    :key="v2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:void(0)"
                        :data-categoryName="v2.categoryName"
                        :data-category2Id="v2.categoryId"
                        >{{ v2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="v3 in v2.categoryChild" :key="v3.categoryId">
                        <a
                          href="javascript:void(0)"
                          :data-categoryName="v3.categoryName"
                          :data-category3Id="v3.categoryId"
                          >{{ v3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // TypeNav 一级分类动态添加背景颜色变量
      currentIndex: -1,
      // TypeNav 分类显示与隐藏
      isTypeNavCatShow: true,
    };
  },
  mounted() {
    // TypeNav 接口请求优化：由于每次加载创建 TypeNav 组件都会发送请求请求数据，而这些数据没有必要重复请求。所以把这个调用放在 App 根组件中调用。
    // this.$store.dispatch("getTypeNavList");
    // if (this.$route.path != "/home") {
    if (this.$route.path != "/home" && this.$route.path != "/") {
      this.isTypeNavCatShow = false;
    }
  },
  computed: {
    ...mapState({
      typeNavList: (state) => state.home.typeNavList,
    }),
  },
  methods: {
    // getCurrentIndex(index) {
    //   this.currentIndex = index;
    // },
    // TypeNav 节流(throttle 函数不要写成箭头函数)
    getCurrentIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 16),
    leaveHandler() {
      this.currentIndex = -1;
      // if (this.$route.path != "/home" ) {
      if (this.$route.path != "/home" && this.$route.path != "/") {
        this.isTypeNavCatShow = false;
      }
    },
    enterHandler() {
      // if (this.$route.path != "/home") {
      if (this.$route.path != "/home" && this.$route.path != "/") {
        this.isTypeNavCatShow = true;
      }
    },
    // 路由跳转与传递参数
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
        if (this.$route.params) {
          location.params = this.$route.params;
          // 参数整理完毕
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          // 1. 使用 CSS 伪类
          // &:hover {
          //   background-color: #eaeaea;
          // }
          // 2. 使用 JS 实现
          .current {
            background-color: #eaeaea;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>