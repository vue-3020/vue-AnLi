/**
 * 此文件配置路由信息
 */
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    // redirect: "",
    children: []
  },
  {
    path: "/agent",
    name: "agent",
    component: () => import("@/views/agent.vue")
  }
];
