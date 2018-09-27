<template>
  <div class="wrapper">
    <!-- 第三层内容 -->
    <!-- 头部 -->
    <Header></Header>
    <!--左侧菜单 -->
    <sidebar></sidebar>
    <!-- 折叠菜单 -->
    <div class="content_box" :class="{'content_collapse':collapse}">
      <!-- 标题导航 -->
      <Tags></Tags>
       <!-- 面包屑导航 -->
       <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
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
// 引入同级的vue文件
import Header from './header'
import Sidebar from './sidebar'
import Tags from './tags'
export default {
  data() {
    return {
      collapse: false
    }
  },
  components: {
    Sidebar,
    Header,
    Tags,
    // Breadcrumb
  },
}
</script >
<style scoped>
.breadcrumb-container {
  top: 40px;
  left: 6px;
  position: absolute;
}
</style>