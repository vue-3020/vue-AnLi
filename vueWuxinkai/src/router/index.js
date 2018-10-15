import Vue from "vue";
import Router from "vue-router";
//如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

import Layout from "&/common/homePage"; //将常用内容设置成变量

export default new Router({
  routes: [{
      path: "/HelloWorld",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/",
      redirect: "/Home" //重定向
    },
    {
      path: "/Login",
      name: "Login",
      component: resolve => require(["#/Login.vue"], resolve),
      meta: {
        title: "首页",
        isUseCache: false,
        keepAlive: false
      }
    },
    {
      path: "/",
      component: Layout, //第三层入口
      meta: {
        title: "首页",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
        path: "/home",
        name: "Home",
        // 当你用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
        component: resolve => require(["#/user/user.vue"], resolve), //第四层内容部分
        meta: {
          title: "用户信息",
          isUseCache: false,
          keepAlive: false
        }
      }]
    },
    {
      path: "/vueRoute", //只有父元素可以加 / 子元素不能加 /  //链接路径
      name: "vueRoute", //路由名称，
      component: Layout, //路径入库 对应的组件模板
      name: "二级路由",
      // redirect: 'noredirect', //重定向 如果是这个就不跳转，这个给二级路由应用的
      meta: {
        title: "二级路由菜单",
        isUseCache: false, //是否缓存页面
        keepAlive: false
      },
      children: [{
          path: "routePath",
          name: "routePath",
          component: resolve => require(["#/vueRoute/routePath.vue"], resolve),
          meta: {
            title: "路由传参",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          },
          children: [{
              path: "routeSon1",
              name: "routeSon1",
              component: resolve =>
                require(["#/vueRoute/children/routeSon1.vue"], resolve),
              meta: {
                title: "query接收路由参数",
                isUseCache: false,
                keepAlive: false
              }
            },
            {
              path: "routeSon2",
              name: "routeSon2",
              component: resolve =>
                require(["#/vueRoute/children/routeSon2.vue"], resolve),
              meta: {
                title: "params接收路由参数",
                isUseCache: false,
                keepAlive: false
              }
            }
          ]
        },
        {
          path: "routeHook",
          name: "routeHook",
          component: () =>
            import("#/vueRoute/routeHook"), //第二种引入方式
          meta: {
            title: "路由钩子函数",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          },
          children: [{
            path: "hookSon/:id",
            name: "hookSon",
            component: resolve =>
              require(["#/vueRoute/children/hookSon.vue"], resolve),
            meta: {
              title: "钩子函数子页面",
              isUseCache: false,
              keepAlive: false
            },
            beforeEnter: (to, from, next) => {
              console.log("/router/index.js 里的beforeEnter");
              next(); //必须写
            },
            beforeLeave: (to, from, next) => {
              //不触发
              console.log("/router/index.js 里的beforeLeave");
              next(); //必须写
            }
          }]
        },
        {
          path: "routeStorage",
          name: "routeStorage",
          component: resolve =>
            require(["#/vueRoute/routeStorage.vue"], resolve),
          meta: {
            title: "路由缓存",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "routeComp",
          name: "routeComp",
          component: resolve => require(["#/vueRoute/routeComp.vue"], resolve),
          meta: {
            title: "分配菜单内容",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          },
          children: [{
              path: "comp1",
              name: "comp1",
              component: resolve =>
                require(["#/vueRoute/comp/comp1.vue"], resolve),
              meta: {
                title: "父子菜单分离1",
                isUseCache: false,
                keepAlive: false
              }
            },
            {
              path: "comp2",
              name: "comp2",
              component: resolve =>
                require(["#/vueRoute/comp/comp2.vue"], resolve),
              meta: {
                title: "父子菜单分离2",
                isUseCache: false,
                keepAlive: false
              }
            },
            {
              path: "comp3",
              name: "comp3",
              component: resolve =>
                require(["#/vueRoute/comp/comp3.vue"], resolve),
              meta: {
                title: "父子菜单分离3",
                isUseCache: false,
                keepAlive: false
              }
            }
          ]
        }
      ]
    },
    {
      path: "/vueVitality",
      name: "vueVitality",
      component: Layout,
      name: "生命周期",
      meta: {
        title: "生命周期",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
          path: "computed",
          name: "computed",
          component: resolve =>
            require(["#/vueVitality/computed.vue"], resolve),
          meta: {
            title: "生命周期computed",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "watch",
          name: "watch",
          component: resolve => require(["#/vueVitality/watch.vue"], resolve),
          meta: {
            title: "生命周期watch",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true
          }
        },
        {
          path: "cycle",
          name: "cycle",
          component: resolve => require(["#/vueVitality/cycle.vue"], resolve),
          meta: {
            title: "生命周期",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true
          }
        },
        {
          path: "mounted",
          name: "mounted",
          component: resolve => require(["#/vueVitality/mounted.vue"], resolve),
          meta: {
            title: "mounted操作dom",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true
          }
        },
        {
          path: "subscribe",
          name: "subscribe",
          component: resolve => require(["#/vueVitality/subscribe.vue"], resolve),
          meta: {
            title: "发布订阅模式",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true
          }
        },
        {
            path: "brother",
            name: "brother",
            component: resolve => require(["#/vueVitality/brother.vue"], resolve),
            meta: {
              title: "兄弟组件通信",
              isUseCache: false,
              keepAlive: false,
              breadcrumbLeft: true
            }
          },
        {
            path: "slot",
            name: "slot",
            component: resolve => require(["#/vueVitality/slot.vue"], resolve),
            meta: {
              title: "发布订阅模式",
              isUseCache: false,
              keepAlive: false,
              breadcrumbLeft: true
            }
          }
      ]
    },
    {
      path: "/Interview",
      name: "Interview",
      component: Layout,
      name: "面试",
      meta: {
        title: "面试",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
        path: "vueTopic1",
        name: "vueTopic1",
        component: resolve => require(["#/Interview/vueTopic1.vue"], resolve),
        meta: {
          title: "vue面试题",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      }]
    },
    {
      path: "/table",
      name: "table",
      component: Layout,
      name: "element-ui",
      meta: {
        title: "element-ui",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
        path: "tableVisible",
        name: "tableVisible",
        component: resolve => require(["#/vueElement/table.vue"], resolve),
        meta: {
          title: "vue面试题",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      }]
    },
    {
      path: "/vuePublic",
      name: "vuePublic",
      component: Layout,
      name: "公用组件",
      meta: {
        title: "公用组件",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
          path: "map1",
          name: "map1",
          component: resolve => require(["#/vuePublic/map1.vue"], resolve),
          meta: {
            title: "百度地图",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "tinymce",
          name: "tinymce",
          component: resolve => require(["#/vuePublic/tinymce.vue"], resolve),
          meta: {
            title: "tinymce编辑器",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "vueQuillEditor",
          name: "vueQuillEditor",
          component: resolve => require(["#/vuePublic/vueQuillEditor.vue"], resolve),
          meta: {
            title: "vueQuillEditor编辑器",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "preview",
          name: "preview",
          component: resolve => require(["#/vuePublic/preview.vue"], resolve),
          meta: {
            title: "preview图片预览",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        },
        {
          path: "echartsIn",
          name: "echartsIn",
          component: resolve => require(["#/vuePublic/echartsIn.vue"], resolve),
          meta: {
            title: "echarts图",
            isUseCache: false,
            keepAlive: false,
            breadcrumbLeft: true //自定义属性
          }
        }
      ]
    },
    {
      path: "/directive",
      name: "directive",
      component: Layout,
      name: "内置指令",
      meta: {
        title: "内置指令",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
        path: "vueAttribute",
        name: "vueAttribute",
        component: resolve => require(["#/directive/vueAttribute.vue"], resolve),
        meta: {
          title: "指令",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      }]
    },
    {
      path: "/vueComm",
      name: "vueComm",
      component: Layout,
      name: "通用组件",
      meta: {
        title: "通用组件",
        isUseCache: false,
        keepAlive: false
      },
      children: [{
        path: "timer",
        name: "timer",
        component: resolve => require(["#/vueComm/timer.vue"], resolve),
        meta: {
          title: "页面跳转关闭定时器",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      },{
        path: "timerChiid",
        name: "timerChiid",
        component: resolve => require(["#/vueComm/timerChiid.vue"], resolve),
        meta: {
          title: "页面的子页面",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      },{
        path: "busUsed",
        name: "busUsed",
        component: resolve => require(["#/vueComm/busUsed.vue"], resolve),
        meta: {
          title: "兄弟页面的事件调用",
          isUseCache: false,
          keepAlive: false,
          breadcrumbLeft: true //自定义属性
        }
      }]
    }
  ]
});
