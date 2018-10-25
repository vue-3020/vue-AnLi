<template>
    <div>
      <Myheader  :back="true">
           详情页
      </Myheader>
      <div class="content container">
        <ul>
          <li>
            <label>书的名称</label>
            <input type="text" v-model="book.bookName">
          </li>
          <li>
            <label>书的信息</label>
            <input type="text" v-model="book.bookInfo">
          </li>
          <li>
            <label>书的价格</label>
            <!-- 确保数字类型 -->
            <input type="text" v-model.number="book.bookPrice">
          </li>
        </ul>

        <button @click="updateBook(book)">确认修改</button>
      </div>
    </div>
</template>
<script>
import Myheader from "../base/MHeader.vue";
import { getOne, update } from "../api/index.js";
export default {
  data() {
    return {
      book: {}
    };
  },
  watch: {
    //监听路由变化 手输路径 页面内容不会变化，
    $route() {
      let id = this.$route.params.id;
      this.getbook(id);
    }
  },
  created() {
    //获取路径id
    let id = this.$route.params.id;
    this.getbook(id);
  },
  methods: {
    //通过id 获取书的信息
    async getbook(id) {
      let { data } = await getOne(id);
      this.book = data;
      //如果没有值就跳回列表页
      Object.keys(this.book).length > 0 ? void 0: this.$router.push('/list')
    },
    //修改后提交
    async updateBook(book){
        console.log(book);
        await update(book)
    //由于跳转比较快，后端数据还没有成功被修改；所以获取的还是之前的数据；
        this.$router.go(-1);
    },
  },
  components: { Myheader }
};
</script>
<style scoped>
.container {
  width: 100%;
  padding: 20px;
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: white;
  z-index: 101;
}
.container li {
  height: 100px;
}
.container li label {
  display: block;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}
.container li input {
  display: block;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  margin-left: 5px;
  border: 1px solid blue;
  font-size: 20px;
  color: brown;
}
.container button {
  width: 100px;
  height: 40px;
  display: block;
  text-align: center;
  line-height: 40px;
  background: red;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: none;
}
</style>
