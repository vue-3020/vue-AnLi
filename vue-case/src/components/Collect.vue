<template>
  <div>
    <Myheader :back="true">收藏页</Myheader>
    <div class="content">
      <ul class="container">
        <li v-for="(book,index) in allBooks" :key="index">
          <img :src="book.bookCover" alt="">
          <div class="right">
            <h3>{{book.bookName}}</h3>
            <p>{{book.bookInfo}}</p>
            <p class="price">{{book.bookPrice}}</p>
            <button class="btn">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Myheader from '../base/MHeader.vue'
import { getCollect } from '../api/index.js'
export default {
  data() {
    return {
      allBooks: []
    }
  },
  created() {
    this.getBooks()
  },
  methods: {
    async getBooks() {
      let {data} = await getCollect()
      this.allBooks = data
    }
  },
  computed: {

  },
  components: {
    Myheader
  }
}
</script>
<style scoped>
.container li img {
  width: 160px;
}
.container li {
  padding: 10px;
  font-size: 16px;
}
.right {
  width: 180px;
  float: right;
}
.price {
  color: red;
  font-size: 30px;
}
.btn {
  width: 60px;
  height: 30px;
  background: red;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}
</style>

