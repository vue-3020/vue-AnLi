import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = { //状态
  count: 2 //共用的数据
}

const mutations = { //改变对象的方法 ,state 就是上面const里的
  add(state, n) { //增加的办法
    state.count += n
  },
  reduce(state, n) { //减少的办法
    state.count -= n
  }
}
const getters = { //过滤
  count: function (state) {
    return state.count += 100
  }
}

export default new Vuex.Store({ //暴漏出接口给其他的页面应用
  state, //存值
  mutations, //方法
  getters //过滤
})
