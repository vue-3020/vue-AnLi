<template>
    <div class="FU">
     <div> 获取值方法:{{count}}</div>
    <br>
     <el-row>
      
       调用vuex 上的方法：
        <el-button type="success" @click="add(10)">过滤先加100 加（10）</el-button>
        <el-button type="success" @click="reduce(5)">过滤先加100 减少（5）</el-button>
        </el-row>
    </div>
</template>

<script>
import store from "@/vuex/store2";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "12345"
    };
  },
  computed: {
    ...mapState(["count"]),
    //   count(){
    //      return this.$store.getters.count //过滤值的办法
    //   }
    ...mapGetters(["count"]) //过滤值的常用办法
  },
  methods: {
    ...mapMutations(["add", "reduce"])
  },
  store
};
</script>
<style scoped>
</style>
