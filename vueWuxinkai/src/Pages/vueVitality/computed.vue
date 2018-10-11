<template>
  <div>
    <p>（1）computed 默认调用 get方法，必须的有return，</p>
    <p>（2）不支持异步逻辑 ，假设注册用户，进行用户校验，需要向后台请求，就变成异步的了。需要watch实现</p>
    <br>
    <p>常用语表单，校验</p>
    （1）全选 <input type="checkbox" v-model="chekAll">
    <div>
      <input class="checkboxs" type="checkbox" v-for="(product,index) in products" :key="index" v-model="product.isSelected">
    </div>
    <br>
    <p>（2）错误的写法</p>
    <input type="text" v-model="a">
    <div>{{msg}}</div>
    <br>
    <p>（3）常用方法</p>
    <input type="text" v-model="b">
    <div>{{contend}}</div>
    <br>
    <p>（4）计算属性缓存 vs 方法:方法不会自动推送给页面响应 ,计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值</p>
    <!-- <div class="t5">{{now}}</div> -->
    <div class="t5">{{nowData}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [{ isSelected: true }, { isSelected: true }],
      msg: '',
      b: '', //先声明
    };
  },
  computed: {
    chekAll: { //只要有一个是false，chekAll的值就会变成false
      get() {
        //返回什么就赋予checkAll属性
        return this.products.every(item => item.isSelected);
      },
      set(val) { //val 是给chekAll 赋予值的时候传递过来的
        this.products.forEach(item => item.isSelected = val)
      }
    },
    a: {
      get() {
        return ''  //this.msg 
      },
      set(val) { //如果谢老 set方法再给 a赋值，并且val 给力别人， a就不会被赋值
        this.msg = val;
      }
    },
    contend() { //监听的是数据
      if (this.b.length < 3) {
        return '小于3'
      }
      if (this.b.length > 6) {
        return '大于6'
      }
      return '正好'
    },
    // now: function () {
    //   return Date.now()
    // }
  },
};
</script >
<style scoped>
.checkboxs {
  margin-left: 6px;
}
.t5 {
  margin-top: 5px;
}
</style>