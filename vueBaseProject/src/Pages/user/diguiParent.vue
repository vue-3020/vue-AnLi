<template>
  <div>
    <!-- 递归组件的使用 -->
    <ul>
      <digui :tree="item" v-for="(item, index) in tree" :key="index"></digui>
    </ul>
    <chil :tree="item" v-for="(item, index) in tree" :key="index"></chil>
  </div>
</template>
<style >
li {
  padding-left: 30px;
}
</style>
<script>
import digui from "./diguiChild.vue";
export default {
  data() {
    return {
      tree: [
        {
          label: "一级菜单",
          test: 1,
          path: "/home",
          children: [
            {
              label: "二级菜单",
              test: 2,
              path: "/home",
              children: [
                {
                  label: "三级菜单",
                  test: 3,
                  path: "/home",
                  children: [
                    {
                      label: "四级菜单",
                      test: 4,
                      path: "/home"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    digui,
    chil: {
      name: 'chil',
      data: function () {
        return {
          count: 0
        };
      },
      props: ["tree"],
      template: `<li>
        <router-link :to="tree.path">{{tree.label}}</router-link>
        <chil v-if="tree.children" :tree="item" v-for="(item, index) in tree.children" :key="index"></chil>
      </li>`
    }
  }
};
</script>
