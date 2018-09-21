import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import Layout from '&/common/homePage' //将常用内容设置成变量
/*
知识点
（1）二级标题（http://localhost:9091/#/tableDemo/box）的写法
（2）给meta 增加自定义属性
（3）在其它页面获取路由属性中的内容
（4）
*/
export default new Router({
  routes: [//配置路由，这里是个数组
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'Nihao 世界',
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: '/',
      redirect: '/Home' //重定向
    },
    {
      path: '/',
      component: Layout,
      meta: {
        title: '首页',
        isUseCache: false,
        keepAlive: false,
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: resolve => require(['#/user/user.vue'], resolve),
          meta: {
            title: '用户信息',
            isUseCache: false,
            keepAlive: false,
          }
        },
        {
          path: '/routeParams',
          name: 'routeParams',
          component: resolve => require(['#/route/routeParams.vue'], resolve),
          meta: {
            title: '路由参数',
            isUseCache: false,
            keepAlive: false,
          },
          children: [
            {
              path: 'routeSon1',
              name: 'routeSon1',
              component: resolve => require(['#/route/children/routeSon1.vue'], resolve),
              meta: {
                title: 'query接收路由参数',
                isUseCache: false,
                keepAlive: false
              }
            },
            {
              path: 'routeSon2',
              name: 'routeSon2',
              component: resolve => require(['#/route/children/routeSon2.vue'], resolve),
              meta: {
                title: 'params接收路由参数',
                isUseCache: false,
                keepAlive: false
              }
            }
          ]
        },
        {
          path: '/routeMethods',
          name: 'routeMethods',
          component: resolve => require(['#/route/routeMethods.vue'], resolve),
          meta: {
            title: '路由钩子',
            isUseCache: false,
            keepAlive: false,
          },
          children: [
            {
              path: 'gouZi/:id',
              name: 'gouZi',
              component: resolve => require(['#/route/children/gouZi.vue'], resolve),
              meta: {
                title: '路由钩子',
                isUseCache: false,
                keepAlive: false
              },
              // beforeEnter: (to, from, next) => {
              //   console.log(to)
              //   console.log(from)
              //   next()//必须写
              // }
            }
          ]
        },
        // 状态管理timer
        {
          path: 'propsEmit',
          name: 'propsEmit',
          component: resolve => require(['#/vuex/propsEmit.vue'], resolve),
          meta: {
            title: 'props和emit的通讯',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: 'timer',
          name: 'timer',
          component: resolve => require(['#/timer/timer.vue'], resolve),
          meta: {
            title: '离开页面关闭定时器',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: 'timerChiid',
          name: 'timerChiid',
          component: resolve => require(['#/timer/timerChiid.vue'], resolve),
          meta: {
            title: '定时器是否关闭',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/refsParent',
          name: 'refsParent',
          component: resolve => require(['#/vuex/refsParent.vue'], resolve),
          meta: {
            title: 'refs、children、parents',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/busUsed',
          name: 'busUsed',
          component: resolve => require(['#/vuex/busUsed.vue'], resolve),
          meta: {
            title: '兄弟节点同学',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/directSingle',
          name: 'directSingle',
          component: resolve => require(['@/directive/directDemo.vue'], resolve),
          meta: {
            title: '局部指令',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/tableDemo',
          name: 'tableDemo',
          component: resolve => require(['#/vuex/tableDemo.vue'], resolve),
          meta: {
            title: '表格示例',
            isUseCache: false,
            keepAlive: false
          }
        },
      ]
    },
    {
      path: '/boxRoute', //只有父元素可以加 / 子元素不能加 /  //链接路径
      name: 'boxRoute',  //路由名称，
      component: Layout, //路径入库 对应的组件模板
      name: '二级路由',
      // redirect: 'noredirect', //重定向 如果是这个就不跳转，这个给二级路由应用的
      meta: {
        title: '二级路由',
        isUseCache: false, //是否缓存页面
        keepAlive: false
      },
      children: [
        {
          path: 'accountTable',
          name: 'accountTable',
          component: resolve => require(['#/system/accountTable.vue'], resolve),
          meta: {
            title: '账号管理',
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true, //自定义属性
          }
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Layout,
      meta: {
        title: '首页',
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: '/commonly',
      name: 'commonly',
      component: Layout,
      meta: {
        title: '首页',
        isUseCache: false,
        keepAlive: false
      },
      children: [
        {
          path: '/preview',
          name: 'preview',
          component: resolve => require(['#/vuex/preview.vue'], resolve),
          meta: {
            title: '图片预览',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/vueQuillEditor',
          name: 'vueQuillEditor',
          component: resolve => require(['#/vuex/vueQuillEditor.vue'], resolve),
          meta: {
            title: 'quill-editor编辑器',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/tinymce',
          name: 'tinymce',
          component: resolve => require(['#/vuex/tinymce.vue'], resolve),
          meta: {
            title: 'tinymce编辑器',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/vueMap',
          name: 'vueMap',
          component: resolve => require(['#/vuex/vueMap.vue'], resolve),
          meta: {
            title: '百度地图',
            isUseCache: false,
            keepAlive: false
          }
        },
      ]
    },
    {
      path: '/404',
      component: resolve => require(['#/404'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
