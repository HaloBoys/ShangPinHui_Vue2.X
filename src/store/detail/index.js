import {
  reqGetDetailItem,
  reqAddOrUpdateShopCar
} from '@/api/index'

import {
  genUuid
} from '@/utils/uuid_token'

const actions = {
  async getDetailItem(context, skuid) {
    const res = await reqGetDetailItem(skuid);
    if (res.code == 200) {
      context.commit("GETDETAILITEM", res.data);
    } else {
      alert('GETDETAILITEM 数据请求失败！')
    }
  },
  async addOrUpdateShopCar(context, {
    skuid,
    skunum
  }) {
    const res = await reqAddOrUpdateShopCar(skuid, skunum);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error("post fail!"))
    }
  }
}
const mutations = {
  GETDETAILITEM(state, detailItem) {
    state.detailItem = detailItem;
  }
}
const state = {
  detailItem: {},
  // uuid 临时游客身份
  uuid_token: genUuid()
}
const getters = {
  categoryView(state) {
    return state.detailItem.categoryView || {};
  },
  skuInfo(state) {
    return state.detailItem.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailItem.spuSaleAttrList || [];
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}