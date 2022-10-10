import {
  reqGetCartList,
  reqDelCartList,
  reqUpdateCartChecked
} from '@/api/'

const actions = {
  async getCartList(context) {
    const res = await reqGetCartList();
    if (res.code == 200) {
      context.commit("GETCARTLIST", res.data)
    } else {
      alert('GETCARTLIST 数据请求失败！')
    }
  },
  // 删除指定 id 商品
  async delCartList(context, skuid) {
    const res = await reqDelCartList(skuid);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('delete fail!'))
    }
  },
  async updateCartChecked(context, {
    skuid,
    checknum
  }) {
    const res = await reqUpdateCartChecked(skuid, checknum);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('update fail!'))
    }
  },
  // 删除所有选中项 action
  deleteAllCheckedGoods(context) {
    let cartInfoList = context.getters.cartList.cartInfoList;
    let promiseState = [];
    cartInfoList.forEach(item => {
      // 返回的是一个 Promise
      let res = item.isChecked == 1 ? this.dispatch('delCartList', item.skuId) : "";
      promiseState.push(res)
    })
    return Promise.all(promiseState);
  },
  // 全选反选操作
  changeAllGoodsState(context, state) {
    let cartInfoList = context.getters.cartList.cartInfoList;
    let stateToNum = state ? '1' : '0';
    let promiseState = [];
    cartInfoList.forEach(item => {
      let res = this.dispatch("updateCartChecked", {
        skuid: item.skuId,
        checknum: stateToNum
      })
      promiseState.push(res)
    })
    return Promise.all(promiseState);
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
}
const state = {
  cartList: []
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}