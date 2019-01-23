import http from '@/utils/httpAxios'
import {
  baseHref
} from '@/api/server.ip'

function resorve(path) {
  return baseHref + path
}
/**
 *  获取登陆信息
 * 
 */
export function loginByUsername(username, password, code) {
  const data = {
    username,
    password,
    code
  }
  //发起请求
  // return http.ajax({
  //   url: resorve('/example/tableData'),
  //   method: 'GET'
  // }, data)
}
