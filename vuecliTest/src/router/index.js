import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
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
      redirect: '/Home'
    },
    {
      path: '/',
      component: resolve => require(['&/common/homePage.vue'], resolve),
      meta: {
        title: '首页',
        isUseCache: false,
      },
      children: [{
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
          children: [{
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
          children: [{
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
          }]
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
            title: '编辑器',
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
          },
        },
        {
          path: '/vuexBox',
          name: 'vuexBox',
          component: resolve => require(['#/vuex/vuexBox.vue'], resolve),
          meta: {
            title: 'vuex获取值mapState',
            isUseCache: false,
            keepAlive: false
          },
        },
        {
          path: '/vuexBox1',
          name: 'vuexBox1',
          component: resolve => require(['#/vuex/vuexBox1.vue'], resolve),
          meta: {
            title: 'vuex改变值',
            isUseCache: false,
            keepAlive: false
          },
        },
        {
          path: '/vuexBox2',
          name: 'vuexBox2',
          component: resolve => require(['#/vuex/vuexBox2.vue'], resolve),
          meta: {
            title: 'vuex过滤值',
            isUseCache: false,
            keepAlive: false
          },
        },
        {
          path: '/vuexBox3',
          name: 'vuexBox3',
          component: resolve => require(['#/vuex/vuexBox3.vue'], resolve),
          meta: {
            title: 'vuex异步修改状态',
            isUseCache: false,
            keepAlive: false
          },
        },
      ]
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
      path: '/404',
      component: resolve => require(['#/404'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
