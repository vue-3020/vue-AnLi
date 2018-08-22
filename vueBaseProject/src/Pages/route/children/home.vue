<template>
  <div class="home">home组件接收query传的参数：{{$route.query.dataObj}}
    <ul>
      <li>{{$route.query.name}}</li>
      <li>{{$route.query.age}}</li>
      <li>{{$route.query.sex}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  }
};
</script>


<style scoped>
  .home {
    width: 400px;
    height: 200px;
    border: 1px solid #ccc;
    margin-top: 10px;
  }
</style>
