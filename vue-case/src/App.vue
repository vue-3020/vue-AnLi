<template>
  <div id="app">
      
    <Tab></Tab>
    <router-view/>
  </div>
</template>

<script>
  import Tab from "./base/Tab.vue";  //底部按钮
export default {
  name: 'App',
  components:{
        Tab
    }
}
</script>

<style>
  /*如果是公共样式，最好写在App.vue 中*/
  *{
    margin:0;
    padding:0;
  }
  ul li{
    list-style:none
  }
  a{
    text-decoration: none;
  }
  /*公共的样式*/
  .content{
    position: absolute;
    top:40px;
    width:100%;
    bottom:50px;
  }
  .container{
        padding-bottom: 50px;
  }
</style>