<template>
    <div>
      <p>自定义指令</p>
      <input type="text" v-model="com">
      <p v-direct-demo="com">改变颜色</p>
    </div>
</template>

<script>
    export default {
      filters: {},
      props: [],
      data(){
        return{
          com:'#C0c'
        }
      },
      directives:{
        directDemo:{
          twoWay:true, //双向数据绑定，这个可以在指令内部使用this.set()
          //bind: 只调用一次 指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时 执行一次的初始化动作
          bind:function (el,binding, nodeDom) {
            console.log(binding);
            console.log('bind');
            el.style = 'color:'+binding.value;
          },
          inserted:function () { //绑定元素插入父元素时调用（父节点存在就会被调用，不必存在document中）
            console.log('instered')
          },
          //update：被绑定元素所在模块更新时调用，无论绑定值是否变化，通过比较更新，前后的绑定值，可以忽略不必要的模块更新
          update:function (el, binding, nodeDom) {
            //  每次在input中输入信息，都会接触这个函数
            console.log('update')
            el.style = 'color:'+binding.value;
          },
          componentUpdated:function (el,bindging,nodeDom) {
            console.log('componentUpdated')
          },
          //unbind 只调用一次，指令与元素解绑时调用
          unbind:function () {
            console.log("unbind");
          }
        }
      },
      components: {},
      watch: {}
    }
</script>

<style scoped>

</style>
