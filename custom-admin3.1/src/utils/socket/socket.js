// 安装并引入相关模块
import SockJS from 'sockjs-client' //下载 "sockjs-client": "^1.3.0",
import Stomp from 'stompjs'; //下载 "stompjs": "^2.3.3",

//项目地址
const SetbaseUrl = process.env.NODE_ENV === "production" ? "http://10.1.1.96:6090" : "/api";

let socket, stompClient = null;

function connection() {
  return new Promise(function (resolve, reject) {
    //连接后台地址
    console.log(`${SetbaseUrl}/gs-guide-websocket`)
    socket = new SockJS(`${SetbaseUrl}/gs-guide-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      resolve(frame)
    }, (err) => {

    })
  })
}

function connect(url, app, callback, params) {
  /** Promise 无法实时接受推送数据  改用callback回调函数
      return new Promise(function (resolve, reject) { 
    })
  */
  stompClient.subscribe(`${url}`, (res) => { // 订阅服务端提供的某个topic
    callback(res)
    // console.log(msg, "msg"); // msg.body存放的是服务端发送给我们的信息
  }, function (err) {})
  stompClient.send(app, {}, JSON.stringify(params))
}

export {
  connection,
  connect
}