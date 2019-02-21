<template>
  <div>
    <h1>1 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。</h1>
    <p>电商促销：临时需要</p>
    <h1>2 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用。</h1>
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
