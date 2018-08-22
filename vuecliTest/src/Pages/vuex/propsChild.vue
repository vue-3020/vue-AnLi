<template>
    <div class="box">
      <p>这是子组件{{mag}}</p>
      <!--向父元素发送内容-->
      <div><el-button @click="sendParentMsg">向父元素传值，用v-on接受</el-button></div>

      <!--接收父元素参数-->
      <p style="margin-top: 50px">从父元素传递过来的内容</p>
      <ul>
        <li>接受的是对象</li>
        <li>{{qianduan.bootstrap}}</li>
        <li>{{qianduan.react}}</li>
        <li>{{qianduan.vue}}</li>
        <li>{{qianduan.D3}}</li>
        <li>{{qianduan.angular}}</li>
      </ul>
      <br>
      <br>
      <div>接收的字符：{{mingxing}}</div>
    </div>
</template>

<script>
    export default {
      props: ['qianduan','mingxing'], //从父元素传递过来的内容
      data() {
        return {
          mag:'123',
          name:'黄晓明',
          age:'20',
          like:'足球',
          objChiid:{ //多加个s
            names:'黄晓明',
            ages:'20',
            likes:'足球',
          }
        }
      },
      methods:{
        //向父元素传值，用this.$emit
        sendParentMsg(){
          this.$emit('sendMsg',this.objChiid)
        }
      }
    }
</script>

<style scoped>
  .box{width: 70%;height: 450px;background: #fff;margin: 0 auto;color: #333;padding: 20px}
  ul{list-style: none}
</style>
