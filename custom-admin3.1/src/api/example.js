import axios from '@/utils/api.request'
import { getToken } from '@/utils/auth'
export function fetchPages (data) {
  return axios.request({
    url: 'example/pages',
    method: 'post',
    data
  })
}
export function fetchList (id) {
  return axios.request({
    url: 'example/list',
    method: 'get'
  })
}
export function fetchApp (id) {
  return axios.request({
    url: 'example/details?id=' + id,
    method: 'get'
  })
}
export function addApp (data) {
  return axios.request({
    url: 'example/add',
    method: 'post',
    data
  })
}

export function updateApp (data) {
  return axios.request({
    url: 'example/update',
    method: 'post',
    data
  })
}

export function deleteApp (data) {
  return axios.request({
    url: 'example/delete',
    method: 'post',
    data
  })
}

export function fetchCities () {
  return axios.request({
    url: 'example/cities',
    method: 'get'

  })
}
export function uploadFile (data) {
  return axios.request({
    url: 'example/uploadFile',
    method: 'post',
    data
  })
}

export function removeFile (data) {
  return axios.request({
    url: 'example/removeFile',
    method: 'post',
    data
  })
}

export function downloadfile (options) {
  let xhr = new XMLHttpRequest()
  let fileName = options.fileName // 文件名称
  let url = options.url
  xhr.open('POST', url, true)
  xhr.responseType = 'arraybuffer'
  xhr.setRequestHeader('Authorization', getToken()) // 请求头中的验证信息等（如果有）
  xhr.setRequestHeader('Content-Type', options.contentType || 'application/json;charset=UTF-8')
  xhr.onload = function () {
    if (this.status === 200) {
      let type = xhr.getResponseHeader('Content-Type')
      let blob = new Blob([this.response], { type: type })
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        /*
         * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
         * the blob for which they were created. These URLs will no longer resolve as
         * the data backing the URL has been freed."
         */
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        let URL = window.URL || window.webkitURL
        let objectUrl = URL.createObjectURL(blob)
        if (fileName) {
          var a = document.createElement('a')
          // safari doesn't support this yet
          if (typeof a.download === 'undefined') {
            window.location = objectUrl
          } else {
            a.href = objectUrl
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        } else {
          window.location = objectUrl
        }
      }
    }
  }
  let data = JSON.stringify(options.data)
  xhr.send(data)
}
