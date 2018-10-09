<template>
 <div>
     
     <p>（1）computed 默认调用 get方法，必须的有return，</p>
     <p>（2）不支持异步逻辑 ，假设注册用户，进行用户校验，需要向后台请求，就变成异步的了。需要watch实现</p>
     <br>
    <p>常用语表单，校验</p>
    （1）全选 <input type="checkbox" v-model="chekAll">
     <div>
        <input class="checkbox" type="checkbox" v-for="product in products" v-model="product.isSelected">
     </div>
     <br>
     <p>（2）错误的写法</p>
     <input type="text" v-model="a">
     <div>{{msg}}</div>
     <br>
     <p>（3）常用方法</p>
     <input type="text" v-model="b">
     <div>{{contend}}</div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      products: [{ isSelected: true }, { isSelected: true }],
      msg:'',
      b:'' //先声明
    };
  },
  computed: {
    chekAll: { //只要有一个是false，chekAll的值就会变成false
      get() {
        //返回什么就赋予checkAll属性
        return this.products.every(item => item.isSelected);
      },
      set(val){ //val 是给chekAll 赋予值的时候传递过来的
          this.products.forEach(item=>item.isSelected = val)
      }
    },
    a:{
        get(){
            return ''  //this.msg 
        },
        set(val){ //如果谢老 set方法再给 a赋值，并且val 给力别人， a就不会被赋值
            this.msg = val;
        }
    },
    contend(){ //监听的是数据
        if(this.b.length <3){
            return '小于3'
        }
        if(this.b.length >6){
            return '大于6'
        }
        return '正好'
    }
  }
};
</script >
<style scoped>
.checkbox {
  margin-left: 6px;
}
</style>