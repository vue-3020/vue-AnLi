import Vue from 'vue'
import Vuex from 'vuex'

import affairs from './modules/vueElement/vuexTable'

Vue.use(Vuex)

// 除了 state 是分模块的，其他 mutations 和 actions 都不分模块，因此规划的时候要注意不要重名！
const store = new Vuex.Store({
  modules: {
    affairs,
  },
  // plugins: [vuexLocal.plugin]
})

export default store