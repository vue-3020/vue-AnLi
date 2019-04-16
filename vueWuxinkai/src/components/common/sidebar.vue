<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="$route.path" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"  ref="el-menu-item" @click="change(subItem.index)">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index"  ref="el-menu-item">
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
      collapse: false, //（3）被折叠者
      items: []
    }
  },
  //自定义事件
  methods: {
    change(index) {
       var _this = this;
      console.log(index);
        _this.$refs["el-menu-item"].forEach((item) => {
        if (item.index == index) {
          item.$el.style.backgroundColor = "red";
        } else {
          item.$el.style.backgroundColor = "#324157";
        }
      });
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$root.bus.$on('collapse', msg => {
      console.log(msg)
      this.collapse = msg
    })
    //请求菜单数据
    this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData').then((data) => {
      if (data.status == 200) {
        this.items = data.data.data
      }
    }).catch(function (err) {
      console.log('获取菜单失败' + err.message)
    })
  },
   watch: {
      '$route': function (x) { // 监听路由变化
     
      //  this.change(this.$route.path)
      }
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
  overflow: auto;
}
/*.sidebar-el-menu上不带.el-menu--collapse样式的被修改*/
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}

</style>