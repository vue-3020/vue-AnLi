<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
      <div class="box">
        <span class="text" v-rotate>旋转汉子测试</span>
      </div>
      </Col>
      <Col span="6">
      <div class="box">
        <i v-rotate>旋</i>
        <i v-rotate>转</i>
        <i v-rotate>汉</i>
        <i v-rotate>子</i>
        <i v-rotate>测</i>
        <i v-rotate>试</i>
      </div>
      </Col>
      <Col span="6">
      <div>col-6</div>
      </Col>
      <Col span="6">
      <div>col-6</div>
      </Col>
    </Row>

  </div>
</template>
<script>
export default {
  name: 'customFn',
  props: [],
  data() {
    return {}
  },
  mounted() {

  },
  methods: {

  }
}
</script>
 
<style lang="less" scoped>
.box {
  height: 100%;
  text-align: center;
  margin-top: 200px;
  position: relative;
  font-size: 40px;
  i{
   font-style: normal;
   color: royalblue;
  }
  .text {
    text-align: center;
 

  }
}
</style>