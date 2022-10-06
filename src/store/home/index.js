import {
  getBaseCategoryList,
  getBannerList,
  getFloorList
} from '@/api/index'
const actions = {
  async getTypeNavList(state) {
    const res = await getBaseCategoryList();
    if (res.code == 200) {
      state.commit("GETTYPENAVLIST", res.data)
    } else {
      alert('getTypeNavList 三级联动数据请求失败！')
    }
  },
  async getBannerList(state) {
    const res = await getBannerList();
    if (res.code == 200) {
      state.commit("GETBANNERLIST", res.data)
    } else {
      alert('getBannerList 轮播图数据请求失败！')
    }
  },
  async getFloorList(state) {
    const res = await getFloorList();
    if (res.code == 200) {
      state.commit("GETFLOORLIST", res.data)
    } else {
      alert('getFloorList Floor数据请求失败！')
    }
  }
}
const mutations = {
  GETTYPENAVLIST(state, typeNavList) {
    state.typeNavList = typeNavList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
}
const state = {
  // 三级联动数据
  typeNavList: [],
  // 轮播图数据
  bannerList: [],
  // Floor 数据
  floorList: []
}

export default {
  actions,
  mutations,
  state,
}