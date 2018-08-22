import {baseHref} from './server.ip'

function resorve(path) {
  return baseHref + path
}

export default {
  apiHref: baseHref,
  // 基础api接口路径
  /**
   *  用户接口
   *
   */
  // 登录
  uPostLogin: {
    url: resorve('/api/login'),
    method: 'POST'
  },
  // 登出
  u_post_log_out: {
    url: resorve('/api/logout'),
    method: 'POST'
  },
  // 获取用户信息
  uGetUserInfo: {
    url: resorve('/api/userInfo'),
    method: 'GET'
  },
  // 获取用户
  uGetUser: {
    url: resorve('/api/user'),
    method: 'GET'
  },
  // 获取table列表数据
  uGetTableList: {
    url: resorve('/api/tableList'),
    method: 'GET'
  }
}
