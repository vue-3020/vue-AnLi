<template>
  <div>
    <!-- 加载子组件 -->
    <h3>封装组件</h3>
    <p>插槽，监听等到函数，还有，父子传值</p>
    <p>下载</p>
    <code class="hljs lang-javaScript firekylin-code">
      npm install countup --save
    </code>
    <Count-to
      :startVal="startVal_1"
      :endVal='endVal_1'
      :delay='delay_1'
      :duration='duration_1'
    >
      <span slot="left">这个商品</span>
      <span slot="right">$</span>
    </Count-to>
  </div>
</template>

<script>
import CountTo from './pottingSon/countTo'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      startVal_1: 500, //开始时间
      endVal_1: 10000, //结束时间
      decimals: 0, //小数点后保留几位小数
      duration_1: 10, //duration 动画时长  默认为1s
      useEasing: true,//动画效果 如果为ture则是先慢后快 否则是匀速  默认为false
      useGrouping: false, // useGrouping 是否有分组效果  默认为false
      separator: ',',// separator 分组用什么符号隔开  默认为，  
      separator: '.',//decimal 整数和小数分组符号  默认为 .
      delay_1: 3000,//  delay 动画延时  默认为 0 ms
    };
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
</style>

