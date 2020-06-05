import Vue from "vue";
import Router from "vue-router";
import {routes,ruleMapping} from "./router";
import store from "@/store/module/userMenu";
import {getSessionStorage} from "@/utils/sys_utils/common";

Vue.use(Router);
const router = new Router({
  routes
});

let whiteList = ["/login", "/"]; // 不重定向白名单

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = getSessionStorage('token')
    if (!token) { //如果没有登录就让他跳到登录
      next('/login')
    } else {
      next()
    }
  }
});

//
export function initDynamicRoutes() {

  console.log('插入到这里面', router)
  
  const currentRoutes = router.options.routes
  const rightList = store.state.rightList
  
  //对菜单进行循环，匹配本地菜单
  rightList.forEach(item => { // 一级菜单
    item.children.forEach(i => { //二级菜单
      currentRoutes[2].children.push(ruleMapping[i.path])
    })
  })
  
  //将数据从新插入到路由
  router.addRoutes(currentRoutes)
}

export default router;