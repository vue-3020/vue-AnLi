import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
  debugger
  let tableData = []
  doCustomTimes(10, () => { // 获取5条
    tableData.push(Mock.mock({
      name: '@name', // 获取的是字段名字
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

// 获取数据
export const getOrgData = req => {
  return orgData
}
// 获取three数据
export const getTreeSelectData = req => {
  return treeData
}
