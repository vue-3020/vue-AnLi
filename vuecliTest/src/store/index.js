import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
import app from './modules/app'
import user from './modules/user'
import vuexTest from './modules/vuexTest'

Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
// 除了 state 是分模块的，其他 mutations 和 actions 都不分模块，因此规划的时候要注意不要重名！
const store = new Vuex.Store({
  modules: {
    app,
    user,
    vuexTest
  },
  // plugins: [vuexLocal.plugin]
})

export default store
