import Vue from 'vue'
import Router from 'vue-router'
//如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import Layout from '&/common/homePage' //将常用内容设置成变量

export default new Router({
  routes: [{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/',
    redirect: '/Home' //重定向
  },
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['#/Login.vue'], resolve),
    meta: {
      title: '首页',
      isUseCache: false,
      keepAlive: false
    }
  },
  {
    path: '/',
    component: Layout, //第三层入口
    meta: {
      title: '首页',
      isUseCache: false,
      keepAlive: false,
    },
    children: [{
      path: '/home',
      name: 'Home',
      // 当你用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
      component: resolve => require(['#/user/user.vue'], resolve), //第四层内容部分
      meta: {
        title: '用户信息',
        isUseCache: false,
        keepAlive: false,
      }
    },]
  }
  ]
})
