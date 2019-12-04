import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import installPlugin from '@/plugin'
import config from '@/config'
import appConst from '@/utils/const'
import jquery from 'jquery'// jquery
/* 全局组件 */
import filtersCustom from '@/utils/filters'

import '@/styles/index.less'
import '@/assets/icons/iconfont.css'

/* 引入vue3新特新 */
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView);
Vue.use(require('vue-moment'))
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$appConst = appConst
Vue.prototype.$ = jquery

// 循环注册全局过滤器
for (let key in filtersCustom) {
  Vue.filter(key, filtersCustom[key])
}

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
