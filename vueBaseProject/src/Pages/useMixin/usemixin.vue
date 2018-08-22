<template>
  <div>
    <div>
      <h3>filter的使用</h3>
    </div>
    <div>
      字符串翻转：
      <p style='padding-left: 20px;'>原字符串：{{testStr}}, 反转后字符串：{{testStr | reverseStr }}, 反转并转成小写：{{testStr | reverseStr | toLower}}</p>
    </div>
    <div>
      数组去重：
      <p style='padding-left: 20px;'>原数组：{{testArray}}, 反转后数组：{{testArray | unique}}</p>
    </div>
    <div>
      <h4>内部filter的使用</h4>
      <p style='padding-left: 20px;'>原字符串：{{newStr}}, 反转后字符串：{{newStr | reverseStr}}, 反转并转成大写【内部filter】：{{newStr | reverseStr | toUpper}}</p>
      <p>加法运算:{{`${num1} + ${num2} = `}} {{ num1 | add(num2)}}</p>
      <p>'{ num1 | add(num2)}'该过滤器中num1为第一个参数， num2为第二个参数</p>
    </div>
    <div>
      <h3>mixin的使用</h3>
    </div>
    <el-button @click="helloMixin">調用minxin中的方法</el-button>
    <el-button @click="callMixin">調用minxin中的方法</el-button>
    <div>
      <h3>watch的使用 </h3>
      <p>监听 watchNum 变量当前值是：{{watchNum}}</p>
      旧值：{{oldValue}}, 新值：{{newValue}}
      <p>
        <el-button @click="watchNum++">增加1</el-button>
        <el-button @click="watchNum--">减少1</el-button>
      </p>
    </div>
    <div>
      <h3>nextTick的使用 </h3>
      <p>
        <el-button @click="toggleShow">{{isShowMsg}}</el-button>
      </p>
      <div v-show="isShow">
        这里是被按钮控制的区域，显示隐藏，
        <div id="box">
          box
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
// import func from './vue-temp/vue-editor-bridge';
export default {
  mixins: [mixin],
  filters: {
    toUpper(str) {
      return str.toUpperCase();
    },
    add(num1, num2) {
      return num1 + num2;
    }
  },
  props: [],
  data() {
    return {
      testStr: "ABCDEFG",
      newStr: "1s45d4gs",
      num1: 1,
      num2: 2,
      addStr: "",
      testArray: [1, 2, 3, 5, 6, 1, 2, 3],
      watchNum: 5,
      oldValue: "",
      newValue: "",
      isShow: false,
      isShowMsg: '显示',
      obj: {
        msg: 'd'
      }
    };
  },
  computed: {},
  methods: {
    callMixin() {
      this.helloMixin();
    },
    toggleShow() {
      this.isShow = !this.isShow
      this.$nextTick().then(function () {
        document.getElementById('box').innerHTML = this.num1 + 1
      })
    }
  },
  mounted() {
    debugger
    console.log('nihao121')
    console.log('nihao')
  },
  watch: {
    // 注意这里不嫩使用箭头函数， 因为箭头函数，绑定了作用域上下文，所以这里的this并不是vue
    watchNum: function (curVal, oldVal) {
      let _this = this;
      _this.$set(_this, "obj", oldVal);
      _this.$set(_this, "newValue", curVal);
      // 下面是使用nextTick来监听页面dom发生变化后，再处理一下事情。
      // _this.$nextTick(function () {
      //   console.log(this.$el.textContent);
      // })
      // _this.$nextTick().then(function () {
      //   console.log('nextTick then 方法')
      // });
    }
  }
};
</script>


<style scoped>
</style>
