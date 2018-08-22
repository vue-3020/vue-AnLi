<template>
  <div>
    <p>自定义组件</p>
    <input v-model="com"/>
    <p v-direct-demo="com">组件的内容:跟随变色</p>
  </div>
</template>

<script>
export default {
  filters: {},
  props: [],
  data() {
    return {
      com: "#C0c"
    };
  },
  directives: {
    directDemo: {
      twoWay: true, // 双向指令 这样就可以在指令内部使用 this.set()
      // bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
      bind: function (el, binding, nodeDom) {
        // el: 指令所绑定的元素，可以用来直接操作 DOM 。
        console.log(binding);
        console.log("bind");
        el.style = "color:" + '#000';
      },
      // inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
      inserted: function () {
        console.log("instered");
      },
      // update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
      update: function (el, binding, nodeDom) {
        //每次在input中输入信息，都会触发这个函数
        console.log("update");
        el.style = "color:" + binding.value;
      },
      // componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
      componentUpdated: function (el, bindging, nodeDom) {
        console.log("componented");
      },
      // unbind: 只调用一次， 指令与元素解绑时调用。
      unbind: function (el, binding, nodeDom) {
        console.log("unbind");
      }
    }
  },
  components: {},
  watch: {}
};
</script>


<style scoped>
</style>

