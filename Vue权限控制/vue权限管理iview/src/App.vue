<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initDynamicRoutes } from '@/router/index'
export default {
  name: 'app',
  mounted() {
   setTimeout(()=>{
      initDynamicRoutes()
   },10)
      // initDynamicRoutes()
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
</style>
