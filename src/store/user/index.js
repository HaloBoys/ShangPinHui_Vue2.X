// vuex 用户注册 & 登录

import {
  reqGetVerifyCode,
  reqRegisterUser,
  reqLoginUser,
  reqAutoLogin,
  reqLogout
} from '@/api/'

const actions = {
  async getVerifyCode(context, phone) {
    const res = await reqGetVerifyCode(phone);
    if (res.code == 200) {
      context.commit("GETVERIFYCODE", res.data);
      return 'ok'
    } else {
      return Promise.reject(new Error("get verifgy code fail"))
    }
  },
  async registerUser(context, userInfo) {
    const res = await reqRegisterUser(userInfo);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  async loginUser(context, userInfo) {
    const res = await reqLoginUser(userInfo);
    if (res.code == 200) {
      context.commit("LOGINUSER", res.data.token)
      // 本地持久化存储 token
      localStorage.setItem("token", res.data.token);
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  async autoLogin(context) {
    const res = await reqAutoLogin();
    if (res.code == 200) {
      context.commit("AUTOLOGIN", res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  async logout(context) {
    const res = await reqLogout();
    if (res.code == 200) {
      context.commit("LOGOUT")
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
}
const mutations = {
  GETVERIFYCODE(state, data) {
    state.verifycode = data
  },
  LOGINUSER(state, token) {
    state.token = token;
  },
  AUTOLOGIN(state, data) {
    state.loginInfo = data;
  },
  LOGOUT(state) {
    // 清空 state 中的数据 和 localStorage 中的数据
    state.token = "",
      state.loginInfo = {}
    localStorage.removeItem("token")
  }
}
const state = {
  verifycode: '',
  // 初始为 null 触发 loginUser action 之后就能获取到 token
  token: localStorage.getItem('token'),
  loginInfo: {}
}
const getters = {
  getUserLoginName(state) {
    return state.loginInfo.name || "";
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}