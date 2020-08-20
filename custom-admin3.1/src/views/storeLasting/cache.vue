<template>
  <div>
    <h1>
      vuex的存储 刷新后数据
      <b style="color:red">不会</b>消失
    </h1>
   <div>
      <h4>下载</h4>
      <pre>
      npm install --save vuex-persistedstate
    </pre>
      <h4>引入 custom-admin3.1\src\store\index.js</h4>
       <pre>
        // （1） 默认使用localStorage来固化数据，
          plugins: [createPersistedState({
            key:'localStorageName',
          })],


        // (2)如果要使用sessionStorage:
         plugins: [createPersistedState({
          paths:['vuex1','catchJS'], //需要被缓存得页面
          storage: window.sessionStorage, //设置储存方法得  cookie  sessionStorage localStorage
          key:'sessionStorageName',
          // reducer(val) {
          //   return {
          //     // store_modules_catch_tablist_input1: val.vuex1.count
          //     count: val.vuex1.count, 
          //     string: val.vuex1.string, 
          //   }
          // }
        })],


        // (3) cookie应用 
         plugins: [createPersistedState({
            key:'cookieCon', //缓存得名字
            paths:['vuex1','catchJS'], //需要被缓存得页面
            storage: {
              getItem: key => Cookies.get(key),
              setItem: function (key, value) {
              //把数据存到cookie中
              // debugger
                Cookies.set(key, value, { expires: 3, secure: false })
              },
              removeItem: key => Cookies.remove(key)
            }
          })],
    </pre>
    <h4>删除缓存   src\views\storeLasting\cache.vue</h4>
    <pre>
      delItem(item){
            if(item =='cookie'){
              Cookies.remove('cookieCon')
            }else if(item =='sessionStorage'){
              sessionStorage.removeItem('sessionStorageName');
              // sessionStorage.clear() //删除所有
              } else if(item =='localStorage'){
              localStorage.removeItem('localStorageName');
            }   
          }

    </pre>
    </div>
    <p>
      <h2>{{vuex1.count}}</h2>
      <br>
      <Button @click="increment" type="primary">+</Button>
      <Button @click="decrement" type="dashed">-</Button>
      <!-- <Button @click="deleteCookie" type="dashed">删除</Button> -->
    </p>
    <br>
    <br>
    <p>
    <div>
      <p>内容: <b>{{ vuex1.string }}</b></p>
      <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    </div>
      <br>
      <div>
         <Button @click="setString" type="primary">写入</Button>
         <Button @click="deleteString" type="dashed">清空 </Button>
      </div>
    </p>
    <br>
    <br>
    <br>
    <div>
       <Button @click="delItem('cookie')" type="dashed">删除cookie</Button>
       <Button @click="delItem('sessionStorage')" type="dashed">删除sessionStorage</Button>
       <Button @click="delItem('localStorage')" type="dashed">删除localStorage</Button>
    </div>
    <!-- 
    <div style="width:600px;margin:0 auto">
      <Form :model="formLeft2" label-position="left" :label-width="100">
        <FormItem label="Title">
          <Input v-model="formLeft2.input4"></Input>
        </FormItem>
        <FormItem label="Title name">
          <Input v-model="formLeft2.input5"></Input>
        </FormItem>
        <FormItem label="Aligned title">
          <Input v-model="formLeft2.input6"></Input>
        </FormItem>
      </Form>
    </div>-->
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import * as Cookies from 'js-cookie'
export default {
  name: '',
  data() {
    return {
      value:'',
      formLeft2: {
        input4: '',
        input5: '',
        input6: ''
      },
    }
  },
  computed: {
    // countAll () {
    //   return this.$store.state.vuex1.count
    // },
    //获取数据 custom-admin3.1\src\store\index.js  设置是vue1
    ...mapState(['vuex1'])
  },
  mounted(){
    if(this.vuex1.string !=''){
      this.value = this.vuex1.string
    }
  },
  methods: {
    ...mapMutations([ 'storeIncrement', 'storeDecrement','myString' ]),
    // 减法
    increment() {
      this.storeIncrement()
    },

    // 增加
    decrement() {
      this.storeDecrement()
    },
    //删除缓存
    // deleteCookie(){
    // Cookies.remove('cookieCon')
    // },
  //设置 input数据
    setString() {
      this.myString(this.value)
    },
    //删除 input 数据
    deleteString() {
       this.myString()
    },
    //删除 cookie
    delItem(item){
      if(item =='cookie'){
        Cookies.remove('cookieCon')
      }else if(item =='sessionStorage'){
        sessionStorage.removeItem('sessionStorageName');
        // sessionStorage.clear() //删除所有
        } else if(item =='localStorage'){
        localStorage.removeItem('localStorageName');
      }   
    }
  }
}
</script>
<style lang="less">
h1 {
  text-align: center;
  margin: 20px 0;
}
</style> 
















