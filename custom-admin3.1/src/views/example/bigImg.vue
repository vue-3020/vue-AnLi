<style scoped>
.img-view {
  position: inherit;
  width: 100%;
  height: 100%;
  z-index: 998;
}
.img {
  width: 300px;
  height: 200px;
  display: block;
  position: fixed;
  left: 0;
  z-index: 1000;
}
</style>
<template>
  <div class="img-view">　　　
    <!--图片显示层-->
    <img :src="imgSrc" id="bigImg" class="img" :style="pieceStyle" :onerror="onerrorImg">
  </div>
</template>
<script>
export default {
  props: ['imgSrc', 'imgPosition', 'tableHeight'],//接受父组件提供的图片地址
  data() {
    return {
      pieceStyle: {},
      onerrorImg: ''
    }
  },
  mounted() {
    if (this.tableHeight > this.imgPosition.clientY - this.imgPosition.offsetY) {
      this.pieceStyle = {
        left: `${(this.imgPosition.clientX - this.imgPosition.offsetX) + this.imgPosition.target.clientWidth}px`,
        top: `${this.imgPosition.clientY - this.imgPosition.offsetY}px`
      }
    } else {
      this.pieceStyle = {
        left: `${(this.imgPosition.clientX - this.imgPosition.offsetX) + this.imgPosition.target.clientWidth}px`,
        top: `${(this.imgPosition.clientY - this.imgPosition.offsetY + this.imgPosition.target.clientHeight) - 200}px`  //200 是大图的高度
      }
    }
    //加载错误的图片
    this.onerrorImg = 'this.src="' + require('../../assets/images/loading.gif') + '"'
  }
}
</script>