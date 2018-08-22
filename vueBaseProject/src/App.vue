<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
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
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";
</style>
