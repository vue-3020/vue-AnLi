<template>
    <div class="FU">
      <p>这是父元素</p>
      <!--<props-child ref='prop'  @sendMsg="changeObjChiidData" ></props-child>-->
      <!--
        :qianduan='ParentObj'
        :mingxing="names" 是发送给子元素的内容

        ref='prop'
        @sendMsg="changeObjChiidData"  是从子元素获取内容
      -->
      <props-child ref='prop'  @sendMsg="changeObjChiidData" :qianduan='ParentObj' :mingxing="names"></props-child>
      <p>父元素接收值：姓名：{{ObjParent.names}},年龄：{{ObjParent.ages}}，爱好：{{ObjParent.likes}}</p>
      <p style="font-size:30px;color:red">（不用点击事件）父元素用ref接收子元素的值，：姓名：{{ObjParentRef.names}},年龄：{{ObjParentRef.ages}}，爱好：{{ObjParentRef.likes}}</p>
      </div>
</template>

<script>
  import propsChild from './propsChild'
  export default {
    data(){
      return{
      //接受子元素
        ObjParent:{}, //接受对象的地方
        ObjParentRef:{}, //接受对象的地方
      //传递给子元素
        ParentObj:{
          bootstrap:'第一名bootstrap',
          react:'第二名react',
          vue:'第三名vue',
          D3:'第四名D3',
          angular:'第五名angular',
        },
        names: '迪丽热巴',
      }
    },
    components:{
      propsChild
    },
    methods:{
      changeObjChiidData(newAge){
        this.ObjParent = newAge
      }
    },
    mounted(){
      this.ObjParentRef = this.$refs.prop.objChiid
    }
  }
</script>

<style scoped>
ul li{list-style: none}
  .FU{background: #20a0ff;width: 100%;height: 100%;position: relative;overflow: hidden;color: #fff}
</style>
