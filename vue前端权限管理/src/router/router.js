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
    path: '/',
    component: () => import("@/views/Home.vue"),
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: () => import("@/views/Welcome.vue")
      },
      {
        path: '/users',
        component: () => import("@/views/users/Users.vue")
      },
      {
        path: '/roles',
        component: () => import("@/views/roles/Roles.vue")
      },
      {
        path: '/goods',
        component: () => import("@/views/goods/GoodsList.vue")
      },
      {
        path: '/categories',
        component: () => import("@/views/goods/GoodsCate.vue")
      }
    ]
  },
  {
    path: '*', //匹配不到上面的路径，就匹配，这界面
    component: () => import("@/views/NotFound.vue")
  }
];