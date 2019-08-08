import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import wu from './module/wu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    wu
  }
})
