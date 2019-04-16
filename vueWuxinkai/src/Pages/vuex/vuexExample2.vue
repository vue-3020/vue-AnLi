<template>
    <div>
      <h2>vuexExample从vuex里获取的值，实现数据共享</h2>
      <p style="font-size:30px;color:red">第{{count}}个</p>
      
    </div>
</template>
<script>
import { mapState,mapMutations} from "vuex";
export default {
  data() {
    return {
      msg: "1234"
    };
  },
  created() {

    //存到vuex里实现资源共享
      this.http.get('https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData').then((data) => {
      if (data.status == 200) {
        this.items = data.data.data
        //将值传到vuex里的listdata中，保存起来
       
      }
    }).catch(function (err) {
      console.log('获取菜单失败' + err.message)
    })
  },
  computed: {
    ...mapState("example", ["count"]), //获取表格数据 和总条数
  },

};
</script>

