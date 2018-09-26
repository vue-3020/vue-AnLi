<template>
    <div class="left">
      <h3>子组件,哥哥组件</h3>
      <p>哥哥传送给弟弟内容</p>
      <div><el-button @click="changeLike">向兄弟组件传值通过中央事件总线控制</el-button></div>
      <div></div>
    </div>
</template>

<script>
    import bus from "../../components/common/bus";

    export default {
       data(){
         return{

         }
       },
      computed:{

      },
      methods:{
        changeLike(){
          console.log('这是传递弟弟的内容')
          bus.$emit('changeLike','打篮球')
        }
      }
    }
</script>

<style scoped>
  .left{height: 300px;width:45%;margin-right: 15px;padding: 20px;border: 1px solid #ccc;float: left}
</style>
