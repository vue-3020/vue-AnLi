<template>
  <li>
    <router-link :to="tree.path">{{tree.label}}</router-link>
    <digui v-if="tree.children" :tree="item" v-for="(item, index) in tree.children" :key="index"></digui>
  </li>
</template>
<style >

</style>
<script>
export default {
  name: "digui",
  props: ["tree"]
};
</script>
