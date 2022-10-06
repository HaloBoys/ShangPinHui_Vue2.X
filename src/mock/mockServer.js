import Mock from 'mockjs'

// 引入 JSON 文件（JSON 文件不需要对外暴露即可引入）
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner", {
  code: 200,
  data: banner
})

Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})