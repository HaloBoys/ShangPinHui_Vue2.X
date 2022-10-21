module.exports = {
  // 配置此项，打包时不生成 map 文件
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn', // 代理目标的基础路径
        // changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}