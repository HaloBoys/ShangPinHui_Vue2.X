import {
  reqgetUserAddress,
  reqgetGoodsList
} from '@/api/'

const actions = {
  async getUserAddress(context) {
    const res = await reqgetUserAddress();
    if (res.code == 200) {
      context.commit("GETUSERADDRESS", res.data)
    } else {
      alert('GETUSERADDRESS 数据请求失败！')
    }
  },
  async getGoodsList(context) {
    const res = await reqgetGoodsList();
    if (res.code == 200) {
      context.commit("GETGOODSLIST", res.data)
    } else {
      alert('GETGOODSLIST 数据请求失败！')
    }
  },
}
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETGOODSLIST(state, goodsList) {
    state.goodsList = goodsList;
  }
}
const state = {
  address: [],
  goodsList: [],
}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}