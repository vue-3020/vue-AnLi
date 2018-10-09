<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>弟弟组件</span>
    </div>
    <div v-for="item in menuItems" :key="item.NAMES" class="text item">
     <i :class="item.ICON"></i> {{item.PARENT_ID}}{{ item.NAMES }}
    </div>
  </el-card>
</template>
<script>
export default {
  props: ['menuItems'],
  data() {
    return {
      collapse: false,
    }
  }
}
</script>