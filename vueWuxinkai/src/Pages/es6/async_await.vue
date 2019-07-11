<template>
  <div>
    <h3>(1) async/await 等待另一个函数的执行结构</h3>
    <h3>(2) 将 async 函数用在 Promise 链中</h3>
    <h3>(3) 把任意类型的函数转成 async 风格</h3>
    <h3>(4) 处理 async 函数中的错误</h3>
    <h3>(5) 正确处理多个 await 操作的并行串行</h3>
    <h3>(6) 使用 Promise.all() 让多个 await 操作并行</h3>
    <h3>(7) 结合 await 和任意兼容 .then() 的代码</h3>
    <h3>(8) 在 for 循环中正确的使用 await</h3>
  </div>
</template>
<script>
import { async } from "q";
export default {
  data() {
    return {
      a: "1"
    };
  },
  methods: {
    //(1)编写第一个 async/await 函数 , 调用菜单获取异步内容
    async menuList() {
      const response = await this.http.get(
        "https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData"
      );
      const column = await response.data.data;
      console.log(`1`, column);
    },

    //(2) 将 async 函数用在 Promise 链中
    async getColumn() {
      const response = await this.http.get(
        "https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData"
      );
      return await response.data.data;
    },

    //（3.1）箭头函数
    async person(uid) {
      this.$axios.get("/api/columns/" + uid).then(res => {
        console.log(res);
      });
    },
    //4 处理 async 函数中的错误
    async getColumn3(id) {
      debugger
      const response = await this.$axios.get("/api/columns/" + id);
      debugger
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return await response
    },
    //4.1
    async showColumnInfo(id) {
      try {
        const column = await this.getColumn3(id);
        console.log(column);
      } catch (err) {
        console.error('请求错误');
      }
    }
  },
  mounted() {
    //1 调用获取菜单方法
    //this.menuList()

    //2 链式调用
    this.getColumn().then(column => {
      console.log(column);
    });

    //3 把任意类型的函数转成 async 风格
    this.person("feweekly");

    //4 捕获错误用 try cathc
    this.showColumnInfo('feweekly');
  }
};
</script>
