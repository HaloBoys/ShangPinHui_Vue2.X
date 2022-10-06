import {
  getSearchList
} from '@/api/index'

const actions = {
  // params形参：当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
  async getSearchList(context, params = {}) {
    const res = await getSearchList(params);
    if (res.code == 200) {
      context.commit("GETSEARCNLIST", res.data)
    } else {
      alert('GETSEARCNLIST 数据请求失败！')
    }
  }
}
const mutations = {
  GETSEARCNLIST(state, searchList) {
    state.searchList = searchList;
  }
}
const state = {
  // 搜索列表数据
  searchList: {}
}
const getters = {
  goodsList(state) {
    // 假如网络不给力state.searchList.goodsList应该返回的是undefined，此处应该返回空数组防止意外情况
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}