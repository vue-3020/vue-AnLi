<template>
  <el-card class="box-card">
    <chil :tree="item" v-for="(item ,index) in tree" :key="index"></chil>
  </el-card>
</template>
<script>
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
    }
  },
  components: {
    chil: {
      name: 'chil', //递归组件是指组件自身调用自身
      data: function () {
        return {
          count: 0
        }
      },
      props: ['tree'],
      template: `<li>
        <router-link :to=tree.path>{{tree.label}}</router-link>
        <chil v-if="tree.children" :tree="item" v-for="(item,index) in tree.children" :key="index"></chil>
      </li>`
    }
  }
}
</script>
<style>
li {
  margin-left: 30px;
}
</style>
