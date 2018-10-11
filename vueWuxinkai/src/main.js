// The Vue build version to load with the `import` command
// 在WebPACK.BASE.CONF中设置了别名（运行时单独或运行时）。
import Vue from 'vue'
import App from './App'
import router from './router'

import http from './utils/httpAxios'

import store from './store' //vuex

import ElementUI from 'element-ui'//element 内容
import 'element-ui/lib/theme-chalk/index.css' // element默认主题
import './components/common/css/common.css' //

import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(vueQuillEditor)

import preview from 'vue-photo-preview' //图片预览
import 'vue-photo-preview/dist/skin.css'
var options = {
  fullscreenEl: false //关闭全屏按钮
}
Vue.use(preview, options) //图片预览

import BaiduMap from 'vue-baidu-map'  //引入百度地图

Vue.config.productionTip = false

require('es6-promise').polyfill()
require('es6-promise/auto')

//(1)引入element-ui
Vue.use(ElementUI, { size: 'small' })

//http ajax请求的方法
Vue.prototype.http = http

//引入百度地图
Vue.use(BaiduMap, {
  ak: 'u8n7EbYE9SUmhF7WKOBu8xtbTDNiY9ex'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  data() {
    return {
      bus: new Vue(), //创建一个实例，
      haha: 'hahah'
    }
  }
}).$mount('#app')
