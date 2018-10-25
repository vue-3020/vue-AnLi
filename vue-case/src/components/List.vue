<template>
  <div>
    <Myheader :back="true">列表页</Myheader>
    <div class="content">
      <ul class="container">
        <router-link v-for="(book,key) in allBooks" :key="key" tag="li" :to="{name:'detail',params:{id:book.boookId}}">
          <img :src="book.bookCover" alt="">
          <div class="right">
            <h3>{{book.bookName}}</h3>
            <p>{{book.bookInfo}}</p>
            <p class="price">{{book.bookPrice}}</p>
            <button class="btn" @click.stop="remove(book.bookId)">删除</button>
            <!-- <button class="btn" @click.stop="collect(book)">收藏</button> -->
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import Myheader from "../base/MHeader.vue"
import { getAll,deleteBook } from "../api/index.js";
export default {
  data() {
    return {
      allBooks: []
    }
  },
  created() {
    this.getAllBooks()
  },
  methods: {
    //获取所有数据
    async getAllBooks() {
      let { data } = await getAll();
      console.log(data)
      this.allBooks = data
    },
    //输出一条
    remove(id) {
      deleteBook(id)
      //从新调用方法
      // this.allBooks = this.allBooks.filter((item) => item.bookId != id)
    },
    //收藏
    // collect() {

    // }
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