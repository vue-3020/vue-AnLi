<template>
  <div>
    <h3 class="h_h3">组建之间项目传值propsEmit.vue<el-button class="reload_btn" @click="reloadData">恢复原值</el-button></h3>
    <props-child ref='prop' :sss='names' :age='age' :xb='sex' :msg='msg' :oldMsg='oldMsg' @sendMsg='changeAge'></props-child>

    <p>本页面定义了两个定时器通过下面两个按钮触发，注意查看console</p>
    <el-button @click="setIntOne">定时器一</el-button>
    <el-button @click="setIntTwo">定时器二</el-button>
  </div>
</template>

<script>
import propsChild from "./propsChild";
export default {
  name: 'propsEmit',
  components: {
    propsChild
  },
  data() {
    return {
      names: '张某某',
      age: 18,
      msg: {
        height: 175,
        weight: '75kg',
      },
      oldMsg: {
        height: 160,
        weight: '80kg',
      },
      sex: '男'
    };
  },
  created() {

  },
  methods: {
    changeAge(newAge) {
      this.age = newAge
    },
    changeName(newName) {
      this.name = newName
    },
    reloadData() {
      this.name = '张某某'
      this.age = 18
      this.msg = {
        height: 175,
        weight: '75kg',
      }
      this.oldMsg = {
        height: 160,
        weight: '80kg',
      }
    },
    setIntOne() {
      let _this = this
      window.timeOne = setInterval(function () {
        console.log('timeOne')
      }, 1000)
      _this.$router.push({
        name: 'testOnEmit'
      })
    },
    setIntTwo() {
      let _this = this
      window.timeTwo = setInterval(function () {
        console.log('timeTwo')
      }, 1000)
      _this.$router.push({
        name: 'testOnEmit'
      })
    }
  },
  computed: {
  },
  mounted() {
    console.log(this.$refs.prop)
    console.log(this.$refs.prop.changedName)
    this.$on('sendName', function (params) {
      console.log('nieihh')
      this.name = params
    })
  },
  beforeDestroy() {
    console.log('hguehuhgu')
    if(window.timeTwo) {
      clearInterval(window.timeTwo)
    }
  }
};
</script>


<style scoped>
.h_h3 {
  height: 50px;
  line-height: 50px;
}
.reload_btn {
  float: right;

}
</style>
