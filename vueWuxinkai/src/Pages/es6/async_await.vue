<template>
  <div>
    <h3>(1) async/await 等待另一个函数的执行结构</h3>
    <h3>(2) 将 async 函数用在 Promise 链中</h3>
    <h3>(3) 把任意类型的函数转成 async 风格</h3>
    <h3>(4) 处理 async 函数中的错误</h3>
    <h3>(5) 正确处理多个 await 操作的并行串行</h3>
    <h3>(6) 使用 Promise.all() 让多个 await 操作并行</h3>
    <!-- <h3>(7) 结合 await 和任意兼容 .then() 的代码</h3> -->
    <h3>(8) 在 for 循环中正确的使用 await</h3>
  </div>
</template>
<script>
import { async } from "q";
const bluebird = require('bluebird');
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
        console.log(3,res);
      });
    },
    //4 处理 async 函数中的错误
    async getColumn3(id) {
      // debugger
      const response = await this.$axios.get("/api/columns/" + id);
      // debugger
      if (response.status !== 200) {
        throw new Error(response.statusText, "请求错误");
      }
      return await response;
    },
    async showColumnInfo(id) {
      try {
        const column = await this.getColumn3(id);
        console.log(4,column);
      } catch (err) {
        console.error(err, "错误");
      }
    },

    //5 正确处理多个 await 操作的并行串行
    sleep(timeout = 2000) {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    },
    async getColumn5(id) {
      await this.sleep(3000); // 等待3秒后获取到内容，
      const response = await this.$axios.get("/api/columns/" + id);
      return await response;
    },
    async showColumn5() {
      const feweekly = await this.getColumn5("feweekly");
      const toolingtips = await this.getColumn5("toolingtips");
      console.log(5, feweekly);
      console.log(5, toolingtips);
    },

    //6 使用 Promise.all() 让多个 await 操作并行
    async getColumn6(id) {
      const response = await this.$axios.get("/api/columns/" + id);
      return await response;
    },
    async showColumn6() {
      const [feweekly, toolingtips] = await Promise.all([
        this.getColumn6("feweekly"),
        this.getColumn6("toolingtips")
      ]);
      console.log(6,feweekly);
      console.log(6,toolingtips);
    },
    // 7 结合 await 和任意兼容 .then() 的代码
    // async main(){
    //   console.log('waiting...');
    //   await bluebird.delay(2000);
    //   console.log('done!'); 
    // }

    //8 在 for 循环中正确的使用 await
    async getColumn8(id){
      await bluebird.delay(1000);
      const response = await this.$axios.get("/api/columns/" + id);
      return await response
    },
    async showColumn8(){
      const names = ['feweekly', 'toolingtips']; //加入到 getColumn8循环
      const promises = names.map(x=>this.getColumn8(x))
      // for of 循环 
      for (const promise of promises) {
        const column = await promise;
        console.log(8,column);
      }
    }
  },
  mounted() {
    //1 调用获取菜单方法
    //this.menuList()

    //2 链式调用
    this.getColumn().then(column => {
      console.log(2,column);
    });

    //3 把任意类型的函数转成 async 风格
    this.person("feweekly");

    //4 捕获错误用 try cathc
    this.showColumnInfo("feweekly");

    //5 正确处理多个 await 操作的并行串行
    this.showColumn5();

    //6 使用 Promise.all() 让多个 await 操作并行
    this.showColumn6()

    //7 结合 await 和任意兼容 .then() 的代码
    // this.main()

    //8 在 for 循环中正确的使用 await
    this.showColumn8()

  }
};
</script>
