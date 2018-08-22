import http from '@/utils/httpAxios'
import Api from '@/api/server.conf'

export function getData(params) {
  return http.ajax(Api.uGetUser, params)
}

/**
 *  获取表格列表数据
 * @param {carentPage: 1, pageSize: 10, jumpTo: 5} params object
 */
export function getTableList(params) {
  return http.ajax(Api.uGetTableList, params)
}
