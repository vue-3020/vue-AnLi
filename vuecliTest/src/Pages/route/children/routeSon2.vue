<template>
  <div class="foo">
    foo组件params传的参数：{{msg}}
    <ul>
      <li>{{msg.name}}</li>
      <li>{{msg.age}}</li>
      <li>{{msg.sex}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg:{}
      }
    },
    created() {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.dataObj
      // 将数据放在当前组件的数据内
      this.msg = routerParams
      console.log(this.msg)
    }
  };
</script>


<style scoped>
  .foo {
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    margin-top: 10px;
    background: darkkhaki;
  }
  ul{
    list-style: none;
  }
  li{height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;margin-bottom: 2px}
</style>
