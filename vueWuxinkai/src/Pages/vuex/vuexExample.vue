<template>
    <div>
        <div>计数器 <el-button @click="minus">-</el-button></div>
        <div>
            当前：{{count}}
        <br> 
        </div>
        <div>计数器 <el-button @click="addCounts">+</el-button></div>
        {{msg}}
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      msg: "1234"
    };
  },
  created() {},
  computed: {
    ...mapState("example", ["count"]) //获取表格数据 和总条数
  },
  methods: {
    ...mapMutations("example", ["addCounts","minus"])
  },
  mounted() {
      //页面执行加载执行一次
    this.addCounts();
  }
};
</script>

