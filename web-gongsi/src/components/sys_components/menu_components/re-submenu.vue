<template>
  <Submenu :name="parent.rs_code">
    <template slot="title" v-if="parent.meun_bean_list">
      <Icon v-if="parent.rsim_url" :custom="parent.rsim_url" />
      {{parent.menu_name}}
    </template>
    <template slot="title" v-if="parent.tabs">
      <!-- <img v-if="item.us_active!=undefined" :src="item.us_active" alt=""> -->
      {{parent.name}}
    </template>
    <div v-if="parent.tabs">
      <template slot="title">
        <!-- <img v-if="item.us_active!=undefined" :src="item.us_active" alt=""> -->
        {{parent.name}}
      </template>
      <template v-for="item in parent.tabs">
        <re-submenu v-if="item.tabs" :key="`menu_${item.rs_code}`" :name="item.frame" :parent="item">
        </re-submenu>
        <menu-item v-else :key="`menu_${item.rs_code}`" :name="`${item.frame}`">
          <!-- <img v-if="item.us_active!=null" :src="item.us_active" alt=""> -->
          {{item.text}}
        </menu-item>
      </template>
    </div>
    <div v-if="parent.meun_bean_list">
      <template v-for="item in parent.meun_bean_list">
        <re-submenu v-if="item.tabs" :key="`menu_${item.rs_code}`" :name="item.frame" :parent="item">
        </re-submenu>
        <menu-item v-else :key="`menu_${item.rs_code}`" :name="`${item.frame}`">
          <!-- <img v-if="item.us_active!=null" :src="item.us_active" alt=""> -->
          {{item.name}}
        </menu-item>
      </template>
    </div>
  </Submenu>
</template>

<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less">
</style>
