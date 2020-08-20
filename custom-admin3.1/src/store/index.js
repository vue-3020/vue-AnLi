import Vue from 'vue'
import Vuex from 'vuex'


import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'




import user from './modules/user'
import app from './modules/app'
import errorLog from './modules/errorlog'
import catchJS from './modules/catch'
import vuex1 from './modules/catch1'
Vue.use(Vuex)



export default new Vuex.Store({

  // （1） 默认使用localStorage来固化数据，
  plugins: [createPersistedState({
    key:'localStorageName',
  })],

  // (2)如果要使用sessionStorage:
  plugins: [createPersistedState({
    paths:['vuex1','catchJS'], //需要被缓存得页面
    storage: window.sessionStorage, //设置储存方法得  cookie  sessionStorage localStorage
    key:'sessionStorageName',
    // reducer(val) {
    //   return {
    //     // store_modules_catch_tablist_input1: val.vuex1.count
    //     count: val.vuex1.count, 
    //     string: val.vuex1.string, 
    //   }
    // }
  })],




  //(3) cookie应用 
  // plugins: [createPersistedState({
  //   key:'cookieCon', //缓存得名字
  //   paths:['vuex1','catchJS'], //需要被缓存得页面
  //   storage: {
  //     getItem: key => Cookies.get(key),
  //     setItem: function (key, value) {
  //     //把数据存到cookie中
  //     // debugger
  //       Cookies.set(key, value, { expires: 3, secure: false })
  //     },
  //     removeItem: key => Cookies.remove(key)
  //   }
  // })],




//   key <String>：存储持久状态的键。（默认：vuex）

// paths <Array>：部分持续状态的任何路径的数组。如果没有路径给出，完整的状态是持久的。（默认：[]）

// reducer <Function>：一个函数，将被调用来减少基于给定的路径持久化的状态。默认包含这些值。

// subscriber <Function>：一个被调用来设置突变订阅的函数。默认为store => handler => store.subscribe(handler)

// storage <Object>：而不是（或与）getState和setState。默认为localStorage。

// getState <Function>：将被调用以重新水化先前持久状态的函数。默认使用storage。

// setState <Function>：将被调用来保持给定状态的函数。默认使用storage。

// filter <Function>：将被调用来过滤将setState最终触发存储的任何突变的函数。默认为() => true

  modules: {
    user,
    app,
    errorLog,
    catchJS,
    vuex1
  }
})
