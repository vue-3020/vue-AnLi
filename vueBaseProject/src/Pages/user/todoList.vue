<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div>---------------------------------------------------------------------------我是分割线---------------------------------------------------------------------------</div>
        <child-list v-bind:todos="todoList" :new-arr = "newArr" :obj = "obj">
          <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
          <template slot-scope="slotProps">
            <!-- 为待办项自定义一个模板，-->
            <!-- 通过 `slotProps` 定制每个待办项。-->
            <!-- <div v-if="slotProps.todo.isComplete">
              {{ slotProps.todo.title }}
            </div>
            <div>{{ slotProps.names[0] }}</div> -->
          </template>
      </child-list>
      <el-button @click="getData">调用数据</el-button>
      <div>---------------------------------------------------------------------------我是分割线---------------------------------------------------------------------------</div>
      <div>
        <p>父元素修改各种类型的值</p>
        <p>{{obj.name}}</p>
        <p>{{obj.ages[0]}}</p>
        <el-button @click="handleObj">修改父obj</el-button>
        <p> {{newArr[0]}} </p>
        <el-button @click="handleData">修改父arr</el-button>
        <p> {{todoList[0].title}} </p>
        <el-button @click="handleArr">修改父arrObj</el-button>
      </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import childList from "./childList";
export default {
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "路由的使用",
          status: false,
          routeName: "RouteUsed",
          isComplete: false
        },
        {
          title: "组建之间的传值、方法互调",
          status: false,
          routeName: "PropsEmit",
          isComplete: false
        },
        {
          title: "vuex的使用",
          status: false,
          routeName: "VuexUsed",
          isComplete: true
        },
        {
          title: "今天要修复100个bug",
          status: false,
          routeName: "RouteUsed",
          isComplete: false
        },
        {
          title: "今天要修复100个bug",
          status: true,
          routeName: "RouteUsed",
          isComplete: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true,
          routeName: "RouteUsed"
        }
      ],
      newArr: ["小明"],
      obj: { name: "小李", ages: [12, 13, 14] }
    };
  },
  components: {
    childList
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  methods: {
    getData() {
      this.http.ajax(this.API.getAreaList, {name: 'lsj', hello: 'word'})
    },
    handleJoinPeople(data) {
      console.log(data);
    },
    handleData: function () {
      // this.newArr[0] = "小王";
      this.$set(this.newArr, 0, "小王");
    },
    handleObj: function () {
      this.obj.name = "小王";
      this.obj.ages[0] = 18;
      // this.$set(this.obj, 'name', "小王");
    },
    handleArr: function () {
      this.todoList[0].title = "luoyou";
      // this.$set(this.obj, 'name', "小王");
    }
  },
  mounted() {
    console.log(this.scope1);
  }
};
</script>


<style scoped>
</style>
