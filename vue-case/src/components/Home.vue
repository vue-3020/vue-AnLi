<template>
    <div>
        <Myheader>首页</Myheader>
        <div class="content">
          <!--内容区域；-->
            <Swiper :sliders="sliders"></Swiper>
            <div class="container">
              <h2>热门图书</h2>
              <ul>
                <!-- <li v-for="item in hotBooks">
                  <img :src="item.bookCover" alt="">
                  <b>{{item.bookName}}</b>
                </li> -->
              </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Myheader from "../base/MHeader.vue";
import Swiper from "../base/Swiper.vue";
export default {
  data() {
    return {
        sliders:[], //轮播图
    };
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    Myheader,
    Swiper
  }
};
</script>
<style scoped>
.container {
  box-sizing: border-box;
  overflow-x: hidden;
}
.container h2 {
  padding-left: 30px;
}
.container ul li {
  margin-top: 20px;
  width: 50%;
  float: left;
  margin-bottom: 20px;
}
.container ul li img {
  display: block;
}
.container ul li b {
  display: block;
  padding-left: 20px;
}
</style>