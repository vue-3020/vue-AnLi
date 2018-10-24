<template>
    <div>
        <Myheader>首页</Myheader>
        <div class="content">
          <!--内容区域；-->
            <Swiper :sliders="sliders"></Swiper>
            <div class="container">
              <h2>热门图书</h2>
              <ul>
                <li v-for="(item,index) in hotBooks" :key="index">
                  <img :src="item.bookCover" alt="">
                  <b>{{item.bookName}}</b>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Myheader from "../base/MHeader.vue";
import Swiper from "../base/Swiper.vue"; //轮播图
import { getSliders, getHot } from "../api/index.js"; //请求的axios
export default {
  data() {
    return {
      sliders: [], //轮播图
      hotBooks: [] //书籍
    };
  },
  created() {
    this.slide(); //轮播图
    this.getHotBook(); //书籍列表
  },
  methods: {
    //轮播图
    async slide() {
      //es6+es7起别名，对象的属性名必须和得到的结果名字一致
      let { data: slidersData } = await getSliders(); //请求数据
      //获取结果放到sliders
      this.sliders = slidersData;
    },
    //书籍
    async getHotBook() {
      let { data } = await getHot();
      this.hotBooks = data;
    }
  },
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