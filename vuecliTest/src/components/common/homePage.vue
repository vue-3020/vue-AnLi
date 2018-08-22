<template>
  <div class="wrapper">
    <!-- 头部 -->
    <Header></Header>
    <sidebar></sidebar>
    <div class="content_box" :class="{'content_collapse':collapse}">
      <!-- 标题导航 -->
      <Tags></Tags>
      <!-- 中间部分 -->
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <!--左侧菜单栏-->

  </div>
</template>
<script>
  import Header from './header'
  import Sidebar from './sidebar'
  import Tags from './tags'


  export default {
    data() {
        return{
          collapse:false
        }
    },
    components: {
      Sidebar,
      Header,
      Tags
    },
    created() {
      this.$root.bus.$on('collapse', msg => {
        this.collapse = msg
      })
    }
  }
</script >
<style scoped>

</style>
