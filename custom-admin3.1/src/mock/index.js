import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
// import { fetchPages, fetchList, fetchCities, addApp, updateApp, deleteApp, fetchApp, uploadFile, removeFile } from './example'
// import { logout, getUserInfo } from './login'
import { fetchPages, fetchList, fetchCities, footerData,addApp, updateApp, deleteApp, fetchApp, removeFile } from './example'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
// Mock.setup({
//   timeout: 1000
// })

Mock.mock(/\/login/, 'post', login)
Mock.mock(/\/account\/userinfo/, 'get', getUserInfo)
Mock.mock(/\/account\/logout/, 'post', logout)
Mock.mock(/\/example\/pages/, 'post', fetchPages)
Mock.mock(/\/example\/list/, 'get', fetchList)
Mock.mock(/\/example\/add/, 'post', addApp)
Mock.mock(/\/example\/update/, 'post', updateApp)
Mock.mock(/\/example\/delete/, 'post', deleteApp)
Mock.mock(/\/example\/details[\s\S]*?/, 'get', fetchApp)
Mock.mock(/\/example\/cities/, 'get', fetchCities)
Mock.mock(/\/example\/list/, 'get', footerData)
// Mock.mock(/\/uploadFile/, 'post', uploadFile)
Mock.mock(/\/removeFile/, 'post', removeFile)
Mock.mock(/\/save_error_logger/, 'success')

export default Mock
