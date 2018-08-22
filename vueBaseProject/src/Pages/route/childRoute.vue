<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-card shadow="hover" :body-style="{ height: '304px'}">
          <div slot="header" class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <router-link :to="{ name: 'scope.row.routeName'}"><i class="el-icon-tickets"></i></router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: '路由的使用',
          status: false,
          routeName: 'RouteUsed'
        },
        {
          title: '组建之间的传值、方法互调',
          status: false,
          routeName: 'PropsEmit'
        },
        {
          title: 'vuex的使用',
          status: false,
          routeName: 'VuexUsed'
        },
        {
          title: '今天要修复100个bug',
          status: false,
          routeName: 'RouteUsed'
        },
        {
          title: '今天要修复100个bug',
          status: true,
          routeName: 'RouteUsed'
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true,
          routeName: 'RouteUsed'
        }
      ]
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  }
};
</script>


<style scoped>

</style>
