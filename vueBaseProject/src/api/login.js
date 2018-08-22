import http from '@/utils/httpAxios'
import Api from '@/api/server.conf'
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return http.ajax(Api.uPostLogin, data)
}

export function logout() {
  return http.ajax(Api.uPostLogOut)
}

export function getUserInfo(token) {
  return http.ajax(Api.uGetUserInfo, {token})
}
