// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/httpAxios'
import API from './api/server.conf'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import store from './store'
import Filters from './filters/filters'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import './components/common/css/common.css'

import preview from 'vue-photo-preview' //图片预览
import 'vue-photo-preview/dist/skin.css'

import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import BaiduMap from 'vue-baidu-map'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(BaiduMap, { //钥匙
  ak: 'u8n7EbYE9SUmhF7WKOBu8xtbTDNiY9ex'
})

Vue.use(vueQuillEditor)

var options = {
  fullscreenEl: false //关闭全屏按钮
}

Vue.use(preview, options) //图片预览

Vue.config.productionTip = false
Vue.prototype.API = API
Vue.prototype.http = http

/** Public Filter */
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}
/** Public Directive */

Vue.use(ElementUI, { size: 'small' })

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store,
  data() {
    return {
      bus: new Vue(),
      haha: 'hahah'
    }
  }
}).$mount('#app')


