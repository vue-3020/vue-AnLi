<template>
    <div class="sidebar">
      <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
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
      collapse: false, //折叠按钮
      items: [
        {
          icon: 'el-icon-setting',
          index: '/Home',
          title: '系统首页'
        },
        {
          icon: 'el-icon-setting',
          index: '/boxRoute/accountTable', //在路径前面加 / 就不会 一级和二级路由重叠
          title: '二级路由'
        },
        {
          icon: 'el-icon-date',
          index: '3',
          title: 'vue-route的使用',
          subs: [
            {
              index: '/routeParams',
              title: '路由传参'
            },
            {
              index: '/routeMethods',
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
              index: '/propsEmit',
              title: 'props和emit的使用'
            },
            {
              index: '/timer',
              title: '页面跳转关闭定时器'
            },
            {
              index: '/refsParent',
              title: 'refs、children、parents'
            },
            {
              index: '/busUsed',
              title: '兄弟组件之间方法调用'
            },
            {
              index: '/vuexUsed',
              title: 'vuex的使用'
            },
            {
              index: '/useMiXin',
              title: 'MiXin的使用'
            },
            {
              index: '/lifeCycle',
              title: '生命周期'
            },
            {
              index: '/directSingle',
              title: '局部指令'
            },
            {
              index: '/tableDemo',
              title: '表格示例'
            },
          ]
        },
        {
          icon: 'el-icon-tickets',
          index: '5',
          title: '表格内容',
          subs: [
            {
              index: '/table/tableVisible',
              title: '定制可见列'
            },
          ]
        },
        {
          icon: 'el-icon-tickets',
          index: '6',
          title: '常用组件',
          subs: [
            {
              index: '/preview',
              title: '图片预览'
            },
            {
              index: '/vueQuillEditor',
              title: 'quill-editor编辑器'
            },
            {
              index: '/tinymce',
              title: 'tinymce编辑器'
            },
            {
              index: '/vueMap',
              title: '百度地图'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      // console.log(this.$route.path);
      return this.$route.path.replace('/', '')
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$root.bus.$on('collapse', msg => {
      console.log(msg)
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>