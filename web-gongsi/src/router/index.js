import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import store from "@/store";
import { Message } from "iview";
import { getSessionStorage } from "@/utils/sys_utils/common";

Vue.use(Router);

const router = new Router({
  routes
});

let whiteList = ["/login", "/agent", "/", "/404"]; // 不重定向白名单

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  //是否前去登陆页
  // if (to.path == "/login") {
  //   //是否存在用户缓存信息   getSessionStorage("NavList") &&
  //   if (getSessionStorage("CommData")) {
  //     //有  跳转首页无法返回
  //     if (to.path == "/login") {
  //       next(from.fullPath);
  //     }
  //   } else {
  //     //没有缓存 前去登陆
  //     next();
  //   }
  // } else {
  //   //非前往登陆页 判断是否存在缓存  getSessionStorage("NavList") &&
  //   if (getSessionStorage("CommData")) {
  //     next();
  //   } else {
  //     //白名单  正常跳转
  //     if (whiteList.indexOf(to.path) !== -1) {
  //       next();
  //     } else {
  //       // 还没有登录过 则跳转到登录界面
  //       next("/login");
  //     }
  //   }
  // }
  next();
});

export default router;
