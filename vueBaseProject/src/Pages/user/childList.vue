<template>
  <div>
    <el-row>
      <el-col :span="16">
        <ul>
          <li
            v-for="todo in todos"
            :key="todo.id"
          >
           <!-- {{todo.title}} -->
            <!-- 我们为每个 todo 准备了一个插槽，-->
            <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
            <slot :todo="todo" :names='names'>
              <!-- 回退的内容 -->
              {{ todo.title }}
              <!-- {{msg}} -->
            </slot>
          </li>
        </ul>
        <div>---------------------------------------------------------------------------我是分割线-----------------------------------</div>
      <div>
        <p>子元素修改各种类型值</p>
        <p>{{obj.name}}</p>
        <p>{{obj.age}}</p>
        <el-button @click="handleObj">修改父obj</el-button> 
        <p> {{newArr[0]}} </p>
        <el-button @click="handleData">修改父arr</el-button> 
        <p> {{todos[0].title}} </p>
        <el-button @click="handleArr">修改父arrObj</el-button> 
      </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "message",
      names: ["lsj", "ngiehi", "ngeihi"]
    };
  },
  props: ["todos", "new-arr", "obj"],
  computed: {},
  methods: {
    handleData: function () {
      // this.newArr[0] = "小王";
      this.$set(this.newArr, 0, "小王");
    },
    handleObj: function () {
      this.obj.name = "小王";
      this.obj.age = 18;
      // this.$set(this.obj, 'name', "小王");
    },
    handleArr: function () {
      this.todos[0].title = "luoyou";
      // this.$set(this.obj, 'name', "小王");
    }
  },
  mounted() {}
};
</script>


<style scoped>
</style>
