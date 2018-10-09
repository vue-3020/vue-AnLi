<template>
  <div id="app">
      <!-- 第二层内容 -->
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
