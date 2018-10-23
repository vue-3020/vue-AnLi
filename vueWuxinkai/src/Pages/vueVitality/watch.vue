<template>
 <div>
     <p> <a target=“_self” href="https://cn.vuejs.org/v2/guide/computed.html">计算属性和侦听器</a></p>
     <p>computed:根据a的值变化了， 算出一个新的值</p>
     <p>watch:观察a的值，a的值变化了，要去做一件事</p>
     <p>不支持缓存，数据变，直接会触发相应的操作</p>
     <p>当一个属性发生变化时，需要执行对应的操作；一对多</p>
    <br>
     <p>支持异步方法，可以进行表单校验, 延迟一秒执行</p>
   <input class="text" type="text" v-model="a">
   {{msg}}
   <br>
   <br>
   <p>watch写法：实现的结果应该是  wuxinkai - vals - wangxiaogou</p>
   <input type="text" v-model="vals">
   {{fullName}}
   <br>
   <br>
   <br>
   <p>key的用于：相同的结构被复用，这是错误的input 值没有变化，在input框输入内容</p>
   <button @click="cut=!cut">点击切换</button>
   <template v-if='cut'>
       <label >登陆</label>
       <input type="text">
   </template>
   <template v-else>
       <label >注册</label>
       <input type="text">
   </template>
   <p>正确的写法</p>
   <button @click="end=!end">点击切换</button>
   <template v-if='end'>
       <label >正确登陆</label>
       <input type="text" key="1">
   </template>
   <template v-else>
       <label >正确注册</label>
       <input type="text" key="2">
   </template>
 </div>
</template>
<script>
export default {
  data() {
    return {
     cut:true,
     end:true,
      a: "", //观察人
      msg: "",
      firstName:'wuxinkai', //
      lastName:'wangxiaogou',
      vals:'',
      fullName:'' //存储的
    };
  },
  watch: { //当和firstName值被修改，lastName的值不会跟着变化， 就的用computed ，监听的是他们的独立的个体
    //只有值变化了，才会去触发事件 ，支持异步
    a(newVal, oldVal) {
      //watch的属性名字要和观察人的名字一致
      setTimeout(() => {
        if (newVal.length < 3) {
          return (this.msg = "小于3");
        }
        if (newVal.length > 6) {
          return (this.msg = "大于6");
        }
        return (this.msg = "正好");
      }, 500);
    },
    vals(newVal, oldVal){
        this.fullName = this.firstName + this.vals +this.lastName
    }
  },
  computed:{
    //   fullName(){ //监听的是他们的集合
    //       return this.firstName + this.vals + this.lastName
    //   }
  }
};
</script >
<style scoped>
.checkbox {
  margin-left: 6px;
}
</style>