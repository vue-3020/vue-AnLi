## 简介

> custom-admin是套采用前后端分离开发模式，基于Vue的后台管理系统前端解决方案

整个框架基于iview组件库开发的，iview是一套基于 Vue.js 的高质量UI 组件库。官方([文档](https://www.iviewui.com/))。

custom-admin采用Webpack4.0 + Vue-cli3.0作为基本开发环境。内置了开发后台管理系统常用的逻辑功能，和开箱即用的业务组件，旨在让开发者能够以最小的成本开发后台管理系统，降低开发量。
## 目录结构
```bash
├── vue.config  webpack配置（Vue-cli3.0）
├── public  打包所需静态资源
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  公共组件
    ├── config  项目运行配置
    ├── utils  封装工具函数
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── styles  样式文件
    └── views  页面文件
```

## 资源
vue.config.js配置说明：https://cli.vuejs.org/zh/guide/webpack.html  
mockjs的文档：http://mockjs.com/  (可以直接看示例)


## 说明


# 旋转 全局 指令
(1) publics 文件下 lib文件下index
```
const plugins = {
  install(Vue, options) {
    Vue.directive('rotate', {
      // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      // update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
      // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      // unbind：只调用一次，指令与元素解绑时调用。
      bind: function () {
        //获取当前参数
        let [el, ...others] = arguments
        //进入
        el.onmouseover = function () {
          el.style.display = 'inline-block'
          el.style.transition = 'all 1s'
          el.style.transform = 'rotateZ(360deg)'
        }

        //离开
        el.onmouseout = function () {
          el.style.transform = 'rotateZ(0deg)'
        }
        console.log(111, el)
      }
    })
  }
}
export default plugins
```
（2）  publics/index 下导出
```
module.exports  =require('./lib/index')
```
(3) 在mainjs下引入
```
//引入全局指令
import rotate from '../publics/index.js'
Vue.use(rotate)
```
