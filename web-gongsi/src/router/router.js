/**
 * 此文件配置路由信息
 */
export default [{
    path: "/login",
    name: "login",
    meta: {
      title: '登录'
    },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: '首页'
    },
    component: () => import("@/views/Home.vue"),
    // redirect: "",
    children: [{
      path: "/11111",
      name: "home",
      meta: {
        title: '首页'
      },
    }]
  },
  {
    path: "/agent",
    name: "agent",
    meta: {

      title: '加载'
    },
    component: () => import("@/views/agent.vue")
  }
];