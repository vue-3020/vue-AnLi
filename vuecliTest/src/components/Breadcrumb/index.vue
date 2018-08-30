<template>
<div class="crumbs-in" >
    <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <!-- 
v-if='item.meta.title' 有头的才显示
 v-if='item.redirect==="noredirect"||index==levelList.length-1', 判断必须是父元素（第一级标签）
       -->
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' :abc='levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</div>
  
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '', meta: { title: '当前页面' } }].concat(matched)
      }
      // console.log(matched)
      this.levelList = matched
    }
  }
}
</script>

