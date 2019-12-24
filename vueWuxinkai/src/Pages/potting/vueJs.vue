<template>
  <div>
    <el-row>
      <el-button @click="getMessageBox">获取定位信息</el-button>
     <el-button  @click="getGlobalFun" type="primary">调用全局函数</el-button>
      <!--  <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button> -->
    </el-row>

  </div>
</template>

<script>
import { messageBox } from "&/vueJS";

export default {

  data() {
    return {

    };
  },
  methods: {
      //获取弹出框
    getMessageBox() {
      messageBox({
        title: "定位",
        content: "北京",
        cancel: "取消",
        ok: "切换定位",
        handleCancle() {
          console.log(1)
        },
        handleOk() {
          console.log(2)
        }
      })
    },
    //获取全局函数
    getGlobalFun(){
        this.globalFunc_one('这是一个全局函数，在 vueJs 页面引入')
    }
  },
  mounted() {


  }
};

</script>

<style lang="scss" type="text/scss" scoped>
</style>
