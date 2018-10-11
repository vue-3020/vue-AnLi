# sell

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### vuex的流程线路图
```
# (1)下载
npm install vuex --save

# (2)引入
import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        show:false
    }
})

# (3)在main.js引入
import store from './store'
new Vue({
  el: '#app',
  router,
  store,       //使用store
  template: '<App/>',
  components: { App }
})

# (4)在同级找到store文件夹中的index.js
import Vue from 'vue'  
import Vuex from 'vuex'

//4.1 引入自己需要的小的模块
import affairs from './modules/vueElement/vuexTable' 
Vue.use(Vuex)

 除了 state 是分模块的，其他 mutations 和 actions 都不分模块，因此规划的时候要注意不要重名！
const store = new Vuex.Store({
  modules: {
//4.2在模块中声明属性，便于查找
    affairs,
  },
})
export default store

# (5)在/modules/vueElement/vuexTable 下的vuexTable.js中
import { getTableList } from "@/api/vueElement/tableApi";
const vuesAccount = {
  state: {
    AffairsData: [],
  },
  getters: {
    getTableList: state => { }
  },
  mutations: {},
  actions: {
    getTableListClick({ commit }, params) {}
  }
};
export default vuesAccount;

# (6)在src/api/vueElement/tableApi 的tableApi.js中进行数据请求
import http from '@/utils/httpAxios'
import { baseHref } from '@/api/server.ip'

function resorve(path){
  return baseHref + path
}
export function getTableList(params){ //进行 ajax请求
return http.ajax({ url: resorve   ('/example/tableData'), method: 'POST' }, params)
}
```

