import Cookies from 'js-cookie'

const TokenKey = 'Tescomm_Access_Token'

export function getToken() {  //获取toten
  return Cookies.get(TokenKey)
}

export function setToken(token) { //设置
  return Cookies.set(TokenKey, token)
}

export function removeToken() {//删除
  return Cookies.remove(TokenKey)
}
