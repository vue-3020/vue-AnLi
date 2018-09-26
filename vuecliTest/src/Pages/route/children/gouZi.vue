<template>
  <div class="bar">
    <div>从父页面通过id传递过来的参数:{{$route.params.id}}</div>
    <div>beforeRouteEnter :进入路由之前执行的函数。</div>
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
      beforeRouteEnter(to, from, next) { //进入路由之前执行的函数
        // this.$confirm('beforeRouteEnter：进入路由之前执行的函数')
        //   .then(_ => {
        //     next();
        //   })
        //   .catch(_ => {});
        // to 代表你要跳转到 的 路由。
        // from 当前所在的路由
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        next();
      },
      beforeRouteUpdate(to, from, next) {  // 在当前路由改变，但是该组件被复用时调用
        // this.$confirm('在当前路由改变，但是该组件被复用时调用beforeRouteUpdate ' + this.$route.params.id)
        //   .then(_ => {
        //     next();
        //   })
        //   .catch(_ => {});

        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        next();
      },
      beforeRouteLeave(to, from, next) { //离开路由之前执行的函数。
        // this.$confirm('离开路由之前执行的函数。? [beforeRouteLeave]')
        //   .then(_ => {
        //     next();
        //   })
        //   .catch(_ => {});

        next();
      },
    }
</script>

<style scoped>

</style>
