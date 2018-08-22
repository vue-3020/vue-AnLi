<template>
    <div>
      <el-row>
        <el-col :span="24"><router-link to="/routeMethods/gouZi/1">路由钩子1</router-link></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><router-link to="/routeMethods/gouZi/2">路由钩子2</router-link></el-col>
      </el-row>

      <router-view class="bar"></router-view>
    </div>
</template>

<script>
    export default {
        name: "routeMethods"
    }
</script>

<style scoped>
  .bar{width: 100%;height: 200px;background: #ccc;margin-top:50px; }
</style>
