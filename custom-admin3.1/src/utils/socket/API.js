import {
  connect
} from './socket'
//
export default {
  ws_GetGraphDataWS_getGraphData: function (callback, params) {
    return connect("/topic/greetings", '/app/ws_GetGraphDataWS_getGraphData', callback, params)
  },
  //机台缺陷类统计
  // （1）接收后台的地址， （2）发送后台的地址 （3）接收后台返回值， （4）发送给后台值
  getCodeScanningMode: function (callback, params) {
    return connect("/topic/MachSiteWebSocketSend_sendMachSiteToEdge", '', callback, params)
  },
}