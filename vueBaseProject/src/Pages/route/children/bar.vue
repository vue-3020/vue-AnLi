<template>
  <div class="bar">
    <div>bar组件通过params获取到id值： {{$route.params.id}}</div>
    <button><router-link to="/home">离开，回首页</router-link></button>
    <div>
      路由钩子函数<br>
      beforeRouteEnter<br>
      beforeRouteUpdate (2.2 新增)<br>
      beforeRouteLeave<br>
    </div>

    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>Do you really want to leave? you have unsaved changes!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        }).catch(() => {});
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    console.log(from)
    next()
    // to 代表你要跳转到 的 路由。
    // from 当前所在的路由
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    this.$confirm('beforeRouteUpdate ' + this.$route.params.id)
      .then(_ => {
        next();
      })
      .catch(_ => {});
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    this.$confirm('确定要离开吗? [beforeRouteLeave]')
      .then(_ => {
        next();
      })
      .catch(_ => {});
  },
  mounted() {
    console.log(this.$root)
  }
};
</script>


<style scoped>
  .bar {
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    margin-top: 20px;
  }
</style>
