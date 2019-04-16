import http from '@/utils/httpAxios'
import { baseHref } from '@/api/server.ip'

function resorve(path) {
  return baseHref + path
}
//查询字典方法
export function DataTypeDef(param) {
  return new Promise((resolve, reject) => {
    http.get(
      resorve('/Base/getDataTypeDef'),
      param,
      { emulateJSON: true }
    )
      .then((res) => { //成功的回调
        resolve(res);
      })
      .catch((res) => { //失败的回调
        reject(res);
      });
  });
}

//生成随机数
export function makeId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text;
}
//获取地市数据
export function getAreaInfo(param) {
  return new Promise((resolve, reject) => {
    http.get(
      resorve('/Base/getAreaInfo'),
      param,
      { emulateJSON: true }
    )
      .then((res) => { //成功的回调
        resolve(res);
      })
      .catch((res) => { //失败的回调
        reject(res);
      });
  });
}
