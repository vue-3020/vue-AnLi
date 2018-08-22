<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
        text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-setting',
          index: 'Home',
          title: '系统首页'
        },
        {
          icon: 'el-icon-setting',
          index: 'todoList',
          title: 'todoList'
        },
        {
          icon: 'el-icon-setting',
          index: 'digui',
          title: '递归组件的使用'
        },
        {
          icon: 'el-icon-date',
          index: '3',
          title: 'vue-route的使用',
          subs: [
            {
              index: 'routeParams',
              title: '路由传参'
            },
            {
              index: 'routeMethods',
              title: '路由钩子函数'
            }
          ]
        },
        {
          icon: 'el-icon-tickets',
          index: '4',
          title: '组件通信',
          subs: [
            {
              index: 'propsEmit',
              title: 'props和emit的使用'
            },
            {
              index: 'refsChild',
              title: 'refs、children、parents'
            },
            {
              index: 'busUsed',
              title: '兄弟组件之间方法调用'
            },
            {
              index: 'vuexUsed',
              title: 'vuex的使用'
            },
            {
              index: 'testOnEmit',
              title: '测试$on'
            },
            {
              index: 'useMiXin',
              title: 'MiXin的使用'
            },
            {
              index: 'lifeCycle',
              title: '生命周期'
            },
            {
              index: 'directSingle',
              title: '局部指令'
            },
            {
              index: 'tableDemo',
              title: '表格示例'
            },
            {
              index: 'ExportTable',
              title: '导出表格'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$root.bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 200px;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
