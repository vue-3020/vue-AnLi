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

### 子组件获取父组件的内容(加载获取)
```
(1)在html上写上自定义属性，用 ":"
<props-child :qianduan='ParentObj' ></props-child>

(2)在js中赋值
data() {
    return {
      ParentObj: [
        { bootstrap: "子组件获取父组件内的值" },
        { bootstrap: "第一名bootstrap" },
      ]
    };
  },

(3)在子组件中获取值 props接收父组件的值
export default {
  props: ["qianduan"], 
  data(){
      return{
          a:"1"
      }
  },
};  
（4）将值绑定到子界面
<ul>
     <li v-for="a in qianduan " :key="a">{{a.bootstrap}}</li>
</ul>
```
### 子组件 (通过事件) 获取父组建的 值 通过this.$parent.parentMsg
```
(1)子组件 html引入
<el-button  type="danger" @click="getParentData"> 获取父组件上的值</el-button>

（2）子组件 事件引入
 //这是子元素调用父元素上的数据
getParentData() {
    this.$set(this, 'parentData', this.$parent.parentMsg)
},

（3）父组件 
export default {
  data() {
    return {
        parentMsg: '这是父元素数据被子元素调用',
    };
  },
}
```
### 子组件调用父组件事件
```
* vue是单向数据流，子事件无法修改，父组件的值，只能调用父组件方法修改父组件的值
(1)父组件 自定义事件，用 @
<props-child @child-msg='things'></props-child>

（2）父组件写事件
export default {
  data() {
    return {
      money: 400,
    };
  },
  methods: {
    things(val) {
      this.money = val;
    }
  },
}

(3) 子组件点击事件
<button @click="getMoney"> 点击触发父组件事件，400改成800</button>

(4) 子组建 发送事件
  methods:{
      getMoney(){
          this.$emit('child-msg',800)
      }
  }
};
```
### 父组件获取 子组件的值 （事件获取），
```
（1）父组件 html的引入
<el-button @click="getChildData">（调用data）获取子组件中的中data里的msg</el-button><span>: {{childMsg}}</span>

（2）父组件  js的引入
getChildData(){
    for (let child of this.$children) {
    // child 就相当于子组件
    // child.$options.name 获取的是当前子组件的  name: "refsChild_in"
    // 上面会有按钮组件
    if(child.$options.name =='refsChild_in'){ //el-button 也是一个组件所有需要判断
        this.$set(this, 'childMsg', child.msg) //给this添加自定义属性，
    }
}

(3) 子组件 需要name 和 msg
export default {
  name: "refsChild_in", //不能删除 在父组件有应用到, 父组件调用子组件数据
  data(){
      return{
          msg:'这是传递到父组件的值通过 ',
      }
  },
};
},
```
### 父组件 调用子组件里面的事件
```
(1)在指令上增加ref
 <props-child ref="parenClick"></props-child>

（2）父组件thml
 <el-button type="primary" @click="fuDiaoZiShiJian">点击关闭子组件的内容和传值</el-button>

 （3）父组件js
    //父组件调用子组件事件
fuDiaoZiShiJian() {
    this.$refs.parenClick.childHide();
},

（4）子组件
    //被父自己调用
    childHide(){
        this.flag =false; //修改子组件的内容
        this.text ='子内容被修改';
    },
```
