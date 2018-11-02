<template>
  <div>
    <div class="hello" ref="homePage">//设置最外层div的ref属性</div>
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
    this.initHeight() //页面加载的时候执行一次
  },
  watch: {//检测值的变化
    clientHeight() {
      this.changgeFixed(this.clientHeight)
    }
  },
  methods: { //绑定的事件
    changgeFixed(clientHeight) {  //动态设置高度
      this.$refs.homePage.style.height = clientHeight + 'px'
    },
    initHeight() {
      // this.$refs.mybox.style.height;  只有写到行内元素才能获取到  <div class="mybox2" ref="mybox" style="height:200px"></div>
      this.clientHeight = document.body.clientHeight - 180;
      window.onresize = () => { //在事件中执行事件
        this.clientHeight = document.body.clientHeight - 180;
      }
    }
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
</style>
