<template>
    <div class="FU">
     <p>(1)vuex是数据管理器，管理状态：状态是我们共用的属性和数据，</p>
     <p>(2)我们登陆，登陆成功就得到用户名，用户id 这就是状态，还有订单，其他页面也会用到这些东西，如果没有vuex就的多次请求，vuex就是把这些属性进行共享</p>
     <p>(3)以前我们都有coolie保管，这里就不要了</p>
     <p>(4)下载 npm install vuex --save</p>
     <br>
     <br>
     <br>
     <div>{{msg}}</div>
     <!-- 
         $store 指定的
         state 从vuex 传过来的

         $store.state.count 获取vuex 属性上的值
      -->
     <div>从vuex获取的值： {{$store.state.count}}  -- 获取值方法2:{{count}}</div>
    <br>
     <el-row>
         <!-- 
             $store.commit('add')" 调用vuex 上的方法
          -->
       调用vuex 上的方法： <el-button type="primary" @click="$store.commit('add')">增加</el-button>
        <el-button type="success" @click="$store.commit('reduce')">减少</el-button>
        </el-row>
    </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex"; //第三种获取值的办法
export default {
  data() {
    return {
      msg: "12345"
    };
  },
//   computed: {
//     count() {
//       return this.$store.state.count; //第二种办法获取值
//     }
//   },
  computed: {
    ...mapState(['count'])
  },  //项目中最常用的办法
  store //在这里引入 不需要向组件一样
};
</script>
<style scoped>
</style>
