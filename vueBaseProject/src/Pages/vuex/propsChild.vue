<template>
  <div class="child">
    <h3>子组件propsChild.vue</h3>
    <div>这里是子组建，我的名字是: {{sss}} , 我的年龄是: {{age}}, 我的性别是: {{xb}}</div>
    <div>这是msg通过props接收参数，我的身高是: {{msg.height}}, 我的体重是: {{msg.weight}}</div>
    <div>这是oldMsg通过attrs接收参数，我的身高是: {{oldMsg.height}}, 我的体重是: {{oldMsg.weight}}</div>
    <div><el-button @click="sendParentMsg">向父元素传值父元素通过v-on接收</el-button>  <span>注意这里age的变化: {{age}}</span></div>
    <div><el-button @click="sendParentName">向父元素传值父元素通过$on接收</el-button>  <span>注意这里name的变化: {{sss}}</span></div>
    <div>
      这里是自己的数据: 要等busUsed兄弟组件来调用本组件的方法来改变我的爱好属性: {{like}}
    </div>
  </div>
</template>

<script>
import bus from '&/common/bus'
export default {
  name: 'propsChild',
  props: ['sss', 'age', 'msg', 'xb'],
  data() {
    return {
      oldMsg: '',
      changedName: '小李四',
      changedAge: 25,
      like: '打乒乓球'
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    sendParentMsg() {
      this.$emit('sendMsg', this.changedAge)
    },
    sendParentName() {
      this.$emit('sendName', this.changedName)
      console.log('触发了 this.$emit ')
    }
  },
  mounted() {
    // 这里用$on监听一下，sendName
    let _this = this
    // _this.like = _this.$attrs['sss']
    // console.log(_this.$attrs['sss'])
    _this.$on('sendName', function (name) {
      console.log(name)
    })
    bus.$on('changeLike', function (newLike) {
      console.log('默认的： ' + this.like)
      console.log('传递过来的： ' + newLike)
      this.like = newLike
      console.log('改变后的： ' + this.like)
      // 用定时器演示上面代码，数据改变，但也没没有刷新
      setTimeout(() => {
        console.log('触发了改变')
        _this.$set(_this, 'like', newLike)
      }, 5000);
    })
  }
};
</script>


<style scoped>
.child {
  border: 1px solid #000;
  padding: 50px 30px 0;
}
</style>
