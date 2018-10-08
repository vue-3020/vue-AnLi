// The Vue build version to load with the `import` command
// 在WebPACK.BASE.CONF中设置了别名（运行时单独或运行时）。
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'//element 内容
import 'element-ui/lib/theme-chalk/index.css' // element默认主题
import './components/common/css/common.css' //
Vue.config.productionTip = false

require('es6-promise').polyfill()
require('es6-promise/auto')

//(1)引入element-ui
Vue.use(ElementUI, { size: 'small' })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
