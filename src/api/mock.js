// Mock 虚拟数据

import axios from 'axios';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 1. 利用axios对象的方法create,去创建一个axios实例
const service = axios.create({
  // 基础路径(发请求的时候，路径当中会出现api)
  baseURL: '/mock',
  // 请求超时的时间 5S 
  timeout: 5000,
});

// 2. 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
service.interceptors.request.use(config => {
  NProgress.start();
  return config;
})

// 3. 响应拦截器：所有的请求在响应之后都会走这个
service.interceptors.response.use(
  // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  (res) => {
    NProgress.done();
    return res.data;
  }, (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile', err));
  })
export default service;