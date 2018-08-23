<template>
    <div class="FU">
     <div> 获取值方法:{{count}}</div>
    <br>
     <el-row>
         <!-- 
             $store.commit('add')" 调用vuex 上的方法
             add 是vuex里的方法
             mapMutations 简化事件写法
          -->
       调用vuex 上的方法： <el-button type="primary" @click="$store.commit('add',10)">增加（10）</el-button>
        <el-button type="success" @click="$store.commit('reduce',5)">减少（5）</el-button>
        <el-button type="success" @click="add(10)">加（10）</el-button>
        <el-button type="success" @click="reduce(5)">减少（5）</el-button>
        </el-row>
    </div>
</template>

<script>
import store from "@/vuex/store1";
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {
      msg: "12345"
    };
  },
  computed: {
    ...mapState(['count'])
  },  //项目中最常用获取值的办法
  methods:{
    ...mapMutations(['add','reduce'])
  },
  store 
};
</script>
<style scoped>
</style>
