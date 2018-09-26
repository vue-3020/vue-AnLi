<template>
    <div>
      <el-button @click="setIntOne">定时器一：当点击关闭的时候定时器不会关闭 看console.log</el-button>
      <el-button @click="setIntTwo">定时器二：页面关闭定时器，</el-button>
    </div>
</template>

<script>
    export default {
      data(){
        return{}
      },
      methods:{
        setIntOne() {
          let _this = this;//异步操作会改变this指向
          window.timeOne = setInterval(function () {
            console.log('定时器在执行')
          }, 1000);
          _this.$router.push({ //跳转页面
            name: 'timerChiid'
          })
        },
        setIntTwo() {
          let _this = this;
          window.timeTwo = setInterval(function () {
            console.log('停止第二个 定时器停止')
          }, 1000);
          _this.$router.push({
            name: 'timerChiid'
          })
        }
      },
      beforeDestroy() {

        if(window.timeTwo) { //关闭第二个定时
          clearInterval(window.timeTwo)
        }
      }
    }
</script>

<style scoped>

</style>
