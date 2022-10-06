import {
  getDetailItem
} from '@/api/index'

const actions = {
  async getDetailItem(context, skuid) {
    const res = await getDetailItem(skuid);
    if (res.code == 200) {
      context.commit("GETDETAILITEM", res.data);
    } else {
      alert('GETDETAILITEM 数据请求失败！')
    }
  }
}
const mutations = {
  GETDETAILITEM(state, detailItem) {
    state.detailItem = detailItem;
  }
}
const state = {
  detailItem: {}
}
const getters = {
  categoryView(state) {
    return state.detailItem.categoryView || {};
  },
  skuInfo(state) {
    return state.detailItem.skuInfo || {};
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}