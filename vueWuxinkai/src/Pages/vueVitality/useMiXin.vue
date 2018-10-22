<template>
  <div>
    <el-button @click="helloMixin">helloMixin调用minxin中的方法</el-button>
    <el-button @click="callMixin">callMixin调用minxin中的方法</el-button>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin], //引入方式
  filters: {
    toUpper(str) {

    },
    add(num1, num2) {
      return num1 + num2
    }
  },
  props: [],
  data() {
    return {
      a: '1'
    }
  },
  methods: {
    callMixin() {
      this.helloMixin()
    },
  },
}  
</script>
