<template>
  <!-- 无限级 -->
  <div class='con'>
    <Menu :theme="theme2" accordion>
      <template :name="item.name" v-for="item in menuList">
        <!-- 有子菜单 -->
        <left-menu-nav v-if="item.children&&item.children.length!==0" :menuList='item' :key='item.name'>
        </left-menu-nav>
        <!-- 无子菜单 -->
        <menu-item v-else :name="item.name" :to="item.to" :key='item.name'>{{item.title}}</menu-item>
      </template>
    </Menu>
    <div class='pad'>
      <router-view />
    </div>
  </div>

</template>
<script>

import leftMenuNav from './About.vue'
export default {
  name: 'leftMenu',
  components: {
    leftMenuNav
  },
  data () {
    return {
      name: 'menu',
      theme2: 'light',
      menuList: [
        {
          title: "就一级菜单",
          name: "0",
          to: '/oralinge'
        },
        {
          title: "模块管理",
          name: "1",
          children: [
            {
              title: "文件管理",
              name: "1-1",
              children: [
                {
                  title: "路由管理",
                  name: "1-1-1",
                  children: [
                    {
                      title: "代码管理",
                      name: "1-1-1-1",
                      to: "/code"
                    }
                  ]
                },
                {
                  title: "组件管理",
                  name: "1-1-2",
                  to: "/con"
                }
              ]
            },
            {
              title: "产品管理",
              name: "1-2",
              to: "/pro"
            },
            {
              title: "商户管理",
              name: "1-3",
              to: "/mer"
            },
            {
              title: "合同信息",
              name: "1-4",
              to: "/contract"
            }
          ]
        },
        {
          title: "架构管理",
          name: "2",
          children: [
            {
              title: "webpack",
              name: "2-1",
              to: "/webpack"
            },
            {
              title: "gulp",
              name: "2-2",
              to: "/gulp"
            }
          ]
        },
        {
          title: "生死簿",
          name: "3",
          children: [
            {
              title: "白名单",
              name: "3-1",
              to: "/Whitelist"
            },
            {
              title: "黑名单",
              name: "3-2",
              to: "blacklist"
            }
          ]
        },
        {
          title: "数据中心",
          name: "4",
          children: [
            {
              title: "报表数据",
              name: "4-1",
              to: "/data"
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.con {
  width: 100%;
  display: flex;
  .pad {
    margin: 5px;
    float: left;
    background: red;
    flex: 1;
  }
}
</style>
