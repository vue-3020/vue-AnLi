<template>
  <div class="child">
    <h3>子组件</h3>
    <div>这里是busUsed子组建，和propsChild组件是兄弟关系</div>
    <div><el-button @click="changeLike">向兄弟组件传值通过中央事件总线控制</el-button></div>
  </div>
</template>

<script>
import bus from '&/common/bus'
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    changeLike() {
      console.log('打篮球' + Math.random(100))
      bus.$emit('changeLike', '打篮球' + Math.random(100))
    }
  },
  mounted() {
  }
};
</script>


<style scoped>
.child {
  border: 1px solid #000;
  padding: 50px 30px 0;
}
</style>
