<template>
  <Submenu :name="menuList.name">
    <!-- 父级菜单 -->
    <template slot="title">
      <Icon :type="menuList.icon" />
      <span>{{ menuList.title }}</span>
    </template>
    <template v-for="item in menuList.children">
      <!-- 如果还有子集，继续调用   -->
      <left-menu-nav v-if="item.children&&item.children.length!==0" :menuList='item' :key='item.index'>
      </left-menu-nav>
      <!-- 子菜单  -->
      <menu-item v-else :key="item.id" :name="item.name" :to="item.to">
        {{item.title}}
      </menu-item>
    </template>
  </Submenu>
</template>
<script>
export default {
  name: 'leftMenuNav',
  props: {
    menuList: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      theme2: 'light',

    }
  }
}
</script>
<style lang="less" scoped>
</style>
