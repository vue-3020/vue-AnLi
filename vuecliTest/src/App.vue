<template>
  <div id="app">
    <!--
    第一入口 ： App.vue
     第二入口 ；homePage.vue
     第三层到页面层：
     -->
    <!--keep-alive 走缓存  在meta属性上定义一个keepAlive，-->
    <keep-alive>
      <router-view  v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*引入全局css*/
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";
</style>
