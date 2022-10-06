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

// getDetailData

export const getDetailItem = (skuid) => {
  return service({
    url: `/item/${skuid}`,
    method: "get",
  })
}