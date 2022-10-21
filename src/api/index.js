// API 统一管理

import service from './request'
import mockAjax from './mock'

// getBaseCategoryList 

export const getBaseCategoryList = () => {
  return service({
    url: "/product/getBaseCategoryList",
    method: "get"
  })
}

// getBannerList

export const getBannerList = () => {
  return mockAjax({
    url: "/banner",
  })
}

// getFloorList

export const getFloorList = () => {
  return mockAjax({
    url: "/floor",
  })
}

// getSearchList

/* 
  请求地址: /api/list
  请求方式: POST
  参数类型：

  {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  }
*/

export const getSearchList = (params) => {
  return service({
    url: "/list",
    method: "post",
    data: params
  })
}

// reqGetDetailItem

export const reqGetDetailItem = (skuid) => {
  return service({
    url: `/item/${skuid}`,
    method: "get",
  })
}

// reqAddOrUpdateShopCar 添加/更新购物车

/* 
  /api/cart/addToCart/{ skuid }/{ skunum }  POST
*/

export const reqAddOrUpdateShopCar = (skuid, skunum) => {
  return service({
    url: `/cart/addToCart/${skuid}/${skunum}`,
    method: "post",
  })
}

// reqGetCartList

export const reqGetCartList = () => {
  return service({
    url: "/cart/cartList",
    method: "get",
  })
}

// reqDelCartList 删除购物车商品

export const reqDelCartList = (skuid) => {
  return service({
    url: `/cart/deleteCart/${skuid}`,
    method: "delete",
  })
}

// reqUpdateCartChecked 商品选中状态修改

/* 
  请求地址：/api/cart/checkCart/{skuID}/{isChecked}
  参数名称	类型	 是否必选	描述
  skuID	    string 	Y	    商品ID
  isChecked	string 	Y	    商品选中状态   0 代表取消选中 1 代表选中
  请求方式：GET
*/

export const reqUpdateCartChecked = (skuid, checknum) => {
  return service({
    url: `/cart/checkCart/${skuid}/${checknum}`,
    method: "get",
  })
}

// reqGetVerifyCode 获取验证码

/* 
  请求地址：/api/user/passport/sendCode/{phone} 
  请求方式：GET
*/

export const reqGetVerifyCode = (phone) => {
  return service({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  })
}

// reqRegisterUser 注册用户

/* 
  请求地址：/api/user/passport/register/
  请求方式：post
  请求参数：
    1. phone
    2. password
    3. code
*/

export const reqRegisterUser = (userInfo) => {
  return service({
    url: "/user/passport/register/",
    data: userInfo,
    method: "post",
  })
}

// reqLoginUser 用户登录

/* 
  请求地址：/api/user/passport/login
  请求方式：post
  请求参数：
    1. phone
    2. password
*/

export const reqLoginUser = (userInfo) => {
  return service({
    url: "/user/passport/login/",
    data: userInfo,
    method: "post",
  })
}

// reqAutoLogin 自动登录接口

/* 
  请求地址：/api/user/passport/auth/getUserInfo
  请求方式：get
*/

export const reqAutoLogin = () => {
  return service({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  })
}

// reqLogout 退出登录

/* 
  请求地址：/api/user/passport/logout
  请求方式：get
*/

export const reqLogout = () => {
  return service({
    url: "/user/passport/logout",
    method: "get",
  })
}

// reqgetUserAddress 获取用户收货地址信息

/* 
  请求地址：/api/user/userAddress/auth/findUserAddressList
  请求方式：get
*/

export const reqgetUserAddress = () => {
  return service({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  })
}

// reqgetGoodsList 获取商品清单信息
/* 
  请求地址：/api/order/auth/trade
  请求方式：get
*/

export const reqgetGoodsList = () => {
  return service({
    url: "/order/auth/trade",
    method: "get",
  })
}

// reqgetTradeNo 获取商品清单信息
/* 
  请求地址：/api/order/auth/submitOrder?tradeNo={tradeNo}
  请求方式：post
*/

export const reqSubmitOrder = (tradeNo, data) => {
  return service({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  })
}

// reqCreateNative 获取订单支付信息
/* 
  请求地址：/api/payment/weixin/createNative/{orderId}
  请求方式：get
*/

export const reqCreateNative = (orderId) => {
  return service({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  })
}


// reqQueryPayStatus 查询支付订单状态
/* 
  请求地址：/api/payment/weixin/queryPayStatus/{orderId}
  请求方式：get
*/

export const reqQueryPayStatus = (orderId) => {
  return service({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  })
}

// reqGetMyOderList 获取我的订单列表
/* 
  请求地址：/api/order/auth/{page}/{limit}
  请求方式：get
*/

export const reqGetMyOderList = (page,limit) => {
  return service({
    // page: 当前第几页
    // limit：每一页展示的数据个数
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  })
}