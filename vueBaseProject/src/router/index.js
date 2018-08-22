import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '&/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/',
      component: resolve => require(['&/common/homePage.vue'], resolve),
      meta: {
        title: '首页',
        isUseCache: false, // 结合activated钩子函数中的判断来确定是否去刷新数据
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: resolve => require(['#/user/user.vue'], resolve),
          meta: {
            title: '用户信息',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: 'todoList',
          name: 'todoList',
          component: resolve => require(['#/user/todoList.vue'], resolve),
          meta: {
            title: 'TodoList',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: 'digui',
          name: 'digui',
          component: resolve => require(['#/user/diguiParent.vue'], resolve),
          meta: {
            title: 'DiGui',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/routeParams',
          name: 'routeParams',
          component: resolve => require(['#/route/routeParams.vue'], resolve),
          meta: {
            title: '路由传参',
            isUseCache: false,
            keepAlive: false
          },
          children: [
            {
              path: 'home1',
              name: 'home1',
              component: resolve => require(['#/route/children/home.vue'], resolve),
              meta: {
                title: 'query接收路由参数',
                isUseCache: false,
                keepAlive: false
              }
            },
            {
              path: 'foo',
              name: 'foo',
              component: resolve => require(['#/route/children/foo.vue'], resolve),
              meta: {
                title: 'params接收路由参数',
                isUseCache: false,
                keepAlive: false
              }
            },
          ]
        },
        {
          path: '/routeMethods',
          name: 'routeMethods',
          component: resolve => require(['#/route/routeMethods.vue'], resolve),
          meta: {
            title: '路由钩子函数',
            isUseCache: false,
            keepAlive: false
          },
          children: [
            {
              path: 'bar/:id',
              name: 'bar',
              component: resolve => require(['#/route/children/bar.vue'], resolve),
              meta: {
                title: '路由钩子',
                isUseCache: false,
                keepAlive: false
              },
              beforeEnter: (to, from, next) => {
                console.log(to)
                console.log(from)
                next()//必须写
              }
            }
          ]
        },
        // 状态管理
        {
          path: '/propsEmit',
          name: 'propsEmit',
          component: resolve => require(['#/vuex/propsEmit.vue'], resolve),
          meta: {
            title: 'props和emit的使用',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/refsChild',
          name: 'refsChild',
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
            title: '兄弟组件之间方法调用',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/vuexUsed',
          name: 'vuexUsed',
          component: resolve => require(['#/vuex/vuexUsed.vue'], resolve),
          meta: {
            title: 'vuex的使用',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/testOnEmit',
          name: 'testOnEmit',
          component: resolve => require(['#/vuex/test$on.vue'], resolve),
          meta: {
            title: '$on测试',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/useMiXin',
          name: 'useMiXin',
          component: resolve => require(['#/useMixin/usemixin.vue'], resolve),
          meta: {
            title: '用户信息',
            isUseCache: false,
            keepAlive: false
          }
        },
        {
          path: '/lifeCycle',
          name: 'lifeCycle',
          component: resolve => require(['#/vuex/lifeCycle.vue'], resolve),
          meta: {
            title: '生命周期',
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
          path: '/ExportTable',
          name: 'ExportTable',
          component: resolve => require(['#/tables/exportTableToExcel.vue'], resolve),
          meta: {
            title: '导出表格',
            isUseCache: false,
            keepAlive: false
          }
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
      path: '/404',
      component: resolve => require(['#/404'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
