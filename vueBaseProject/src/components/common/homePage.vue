<template>
  <div class="wrapper">
    <Header ></Header>
    <sidebar></sidebar>
    <div class="content_box" :class="{'content_collapse':collapse}">
      <tags></tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
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
    Header,
    Sidebar,
    Tags
  },
  created() {
    this.$root.bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>
