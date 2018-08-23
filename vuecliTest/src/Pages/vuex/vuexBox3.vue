<template>
    <div class="FU">
     <div class="box"> 获取值方法:{{count}}</div>
    <br>
     <el-row>
       调用vuex 上的方法：异步应用
        <el-button type="success" @click="add(10)">加（10）</el-button>
        <el-button type="success" @click="reduce(3)">减少（3）</el-button>
     </el-row>
     <br>
     <br>
     <el-row>
         
        <el-button type="success" @click="addAction"> 异步执行点击后请等待3秒 加（30）</el-button>
        <el-button type="success" @click="reduceAction"> 异步点击后请等待3秒减 少（25）</el-button>
     </el-row>
    </div>
</template>

<script>
import store from "@/vuex/store3";
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "12345"
    };
  },
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    ...mapMutations(["add", "reduce"]),

    ...mapActions(["addAction", "reduceAction"]) //异步方法
  },
  store
};
</script>
<style scoped>
.box{font-size: 40px}
</style>
