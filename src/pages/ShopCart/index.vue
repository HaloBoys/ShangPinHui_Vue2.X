<template>
  <div class="cart" v-if="cartInfoList.length">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartItem in cartInfoList"
          :key="cartItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartItem.isChecked == 1"
              @change="changeChecked(cartItem.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl" />
            <div class="item-msg">
              {{ cartItem.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="countHandler('sub', -1, cartItem)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartItem.skuNum"
              minnum="1"
              class="itxt"
              @change="
                countHandler('mod', Number($event.target.value), cartItem)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="countHandler('add', 1, cartItem)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuPrice * cartItem.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteGoods(cartItem.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && cartInfoList.length > 0"
          @change="changeAllGoodsState($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="cartNone" v-else>购物车空空如也...</div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((element) => {
        if (element.isChecked == 1) {
          sum += element.skuPrice * element.skuNum;
        }
      });
      return sum;
    },
    isCheckedAll() {
      return this.cartInfoList.every((element) => element.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },

    // 数量操作
    // async countHandler(flag, disnum, target) {
    //   if (flag) {
    //     if (flag == "sub") {
    //       if (target.skuNum > 1) {
    //         disnum = -1;
    //       } else {
    //         disnum = 0;
    //       }
    //     } else if (flag == "add") {
    //       disnum = 1;
    //     } else if (flag == "mod") {
    //       if (isNaN(disnum) || disnum < 1) {
    //         // 用户输入的数字非法
    //         disnum = 0;
    //       } else {
    //         // 用户输入（正常情况）或者输入的是小数（parseInt）
    //         disnum = parseInt(disnum) - target.skuNum;
    //       }
    //     }
    //   }
    //   // 向服务器发请求
    //   try {
    //     await this.$store.dispatch("addOrUpdateShopCar", {
    //       skuid: target.skuId,
    //       skunum: disnum,
    //     });
    //     this.getData();
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // },

    /* 
      数量操作（节流）
    */
    countHandler: throttle(async function (flag, disnum, target) {
      if (flag) {
        if (flag == "sub") {
          if (target.skuNum > 1) {
            disnum = -1;
          } else {
            disnum = 0;
          }
        } else if (flag == "add") {
          disnum = 1;
        } else if (flag == "mod") {
          if (isNaN(disnum) || disnum < 1) {
            // 用户输入的数字非法
            disnum = 0;
          } else {
            // 用户输入（正常情况）或者输入的是小数（parseInt）
            disnum = parseInt(disnum) - target.skuNum;
          }
        }
      }
      // 向服务器发请求
      try {
        await this.$store.dispatch("addOrUpdateShopCar", {
          skuid: target.skuId,
          skunum: disnum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除购物车商品
    async deleteGoods(skuId) {
      try {
        await this.$store.dispatch("delCartList", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 商品选中状态修改
    async changeChecked(skuid, event) {
      let checknum = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateCartChecked", {
          skuid: String(skuid),
          checknum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除所有选中商品
    async deleteAllCheckedGoods() {
      try {
        await this.$store.dispatch("deleteAllCheckedGoods");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选反选操作
    async changeAllGoodsState(event) {
      try {
        await this.$store.dispatch("changeAllGoodsState", event.target.checked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cartNone {
  text-align: center;
  height: 300px;
  line-height: 300px;
  font-size: 32px;
  font-weight: 700;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>