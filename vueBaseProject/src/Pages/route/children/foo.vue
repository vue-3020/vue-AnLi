<template>
  <div class="foo">
    foo组件params传的参数：{{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  created() {
    // 取到路由带过来的参数
    let routerParams = this.$route.params.dataObj
    // 将数据放在当前组件的数据内
    this.msg = routerParams
  }
};
</script>


<style scoped>
    .foo {
        width: 400px;
        height: 200px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>
