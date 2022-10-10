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