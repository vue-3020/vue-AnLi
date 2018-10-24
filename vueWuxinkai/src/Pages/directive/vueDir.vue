<template>
  <div>
    <div class="a" v-drag>1</div>
    <div class="a" v-drag>2</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  directives: {
    drag(el) {
      el.onmousedown = function (e) { // 当页面刷新或者第一次进来；初始化vue实例，这个directives中的方法会自动执行；
        let disX = e.pageX - this.offsetLeft;
        let disY = e.pageY - this.offsetTop;
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disX + 'px'
          el.style.top = e.pageY - disY + 'px'
        }
        document.onmouseup = function (e) {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  }
}
</script>
<style>
.a {
  width: 100px;
  height: 100px;
  background: red;

  position: absolute;
}
.a:nth-child(2) {
  top: 200px;
}
</style>
