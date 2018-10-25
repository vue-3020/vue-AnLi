import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
//   linkActiveClass: 'active',  //一级路由匹配就添加 添加导航 class
//   linkExactActiveClass: 'active2',//完全匹配才添加
  routes: [{
      path: '/',
      redirect: "/Home"
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(["@/components/Home.vue"], resolve),
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(["@/components/List.vue"], resolve),
    }, {
      path: '/add',
      name: 'Add',
      component: resolve => require(["@/components/Add.vue"], resolve),
    }, {
      path: '/list',
      name: 'List',
      component: resolve => require(["@/components/List.vue"], resolve),
    },
    {
      path: '/collect',
      name: 'Collect',
      component: resolve => require(["@/components/Collect.vue"], resolve),
    },
    {
      path: "/detail/:id",
      name: 'Detail',
      component: resolve => require(["@/components/Detail.vue"], resolve),
    }

  ]
})
