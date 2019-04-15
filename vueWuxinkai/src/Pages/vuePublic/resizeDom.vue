<template>
  <div>
    <div class="hello" ref="homePage">//设置最外层div的ref属性
      <br>
      <div class="top-row" style="float:left"></div>
      <div :style="'width:200px;background:pink;float:left;height:'+this.$root.$data.windowHeight+'px'">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientHeight: '',
    }
  },
  mounted() { //页面初始化完成执行的事件
    //从main.js中获取高度
    console.log(this.$root.$data.windowHeight);

    // this.initHeight() //页面加载的时候执行一次

    //---------------------第二种办法---------注释的是第一种办法-----------------------
    let _this = this
    // 获取浏览器可视区域高度
    this.clientHeight = document.documentElement.clientHeight;
    window.onresize = function () {
      // debugger
      //this是vue组件 VueComponent
      _this.clientHeight = document.documentElement.clientHeight;
      _this.changeFixed(_this.clientHeight);
    }
  },
  watch: {//检测值的变化
    // clientHeight() {
    //   this.changgeFixed(this.clientHeight)
    // }
    //---------------------第二种办法--------------------------------
    clientHeight: function () {
      this.changeFixed(this.clientHeight);
    }
  },
  methods: { //绑定的事件
    // changgeFixed(clientHeight) {  //动态设置高度
    //   this.$refs.homePage.style.height = clientHeight + 'px'
    //   //通过dom操作项目
    //   document.querySelector(".top-row").style.height = clientHeight - 100 + "px";
    // },
    // initHeight() {
    //   this.clientHeight = document.body.clientHeight - 180;
    //   window.onresize = () => { //在事件中执行事件
    //     debugger
    //     //this是window
    //     this.clientHeight = document.body.clientHeight - 180;
    //   }
    // }

    //---------------------第二种办法--------------------------------
    changeFixed(clientHeight) {
      this.$refs.homePage.style.height = clientHeight - 200 + 'px'
      document.querySelector(".top-row").style.height = clientHeight - 360 + "px";
    },
  }
}
</script>
<style>
.hello {
  /* width: 200px;
  height: 200px; */
  background: #ccc;
}

.mybox2 {
  width: 300px;
  height: 200px;
  background: pink;
}
.top-row {
  width: 200px;
  height: 200px;
  background: red;
}
</style>
