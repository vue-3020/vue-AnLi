<template>
    <div class="box">
      子组件:
      <p>{{names}}</p>
      <br>
      <el-button @click="getParentData">获取父元素的data中的值</el-button>
      <span>父元素中的数据：{{parentData}}</span>
      <br>
     <div style="margin-top: 40px;">
       <el-button type="danger" @click="getParentMethods">调用父元素的方法</el-button>
     </div>
    </div>
</template>

<script>

    export default {
      name: "refsChild_in", //不能删除 在父组件有应用到
      data(){
          return{
            msg: '这是子组件中的msg展示到父组件中123456', //值传到父元素
            names:'12345678',
            parentData:''//子元素接受父元素的内容
          }
      },
      methods:{
        //这个方法被父元素调用
        // changeName(name) {
        //   this.$set(this, 'names', name)
        // },

        //这是子元素调用父元素上的数据
        getParentData() {
          this.$set(this, 'parentData', this.$parent.parentMsg)
        },
      //  子元素调用父元素上的方法
        getParentMethods() {
          this.$parent.setParentMsg()
        }
      }
    }
</script>

<style scoped>
  .box{width: 70%;height: 450px;background: #fff;margin: 0 auto;color: #333;padding: 20px}
  ul{list-style: none}
</style>
