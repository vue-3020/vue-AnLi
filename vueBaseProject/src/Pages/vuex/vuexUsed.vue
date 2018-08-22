<template>
  <div>
    <h3 class="h_h3">vuex的使用</h3>
    <div class="vuex_parent">
      <ul>
        <li>这是testComputed的值：{{testComputed}}</li>
        <li>这是 mapState 中 testState的值：{{testState}}</li>
        <li>这是 mapState 中 testAge的值：{{testAge}}</li>
        <li>这是 mapGetters 中的 getTestState {{getTestState}}</li>
        <li>这是 mapGetters 中的 getTestAge {{getTestAge}}</li>
        <li v-if='Object.keys(getMsgData).length > 0'>
          id: {{getMsgData.id}}, name: {{getMsgData.name}}, sex: {{getMsgData.sex}}
        </li>

         <li>这是 mapGetters 中的 getTestAge {{currentPage}}</li>
      </ul>
      <el-button @click="change_test_age(12)">调用mapMutations中的change_test_age 参数是 12</el-button>
      <el-button @click="changeTestAge(28)">调用mapActions中的changeTestAge参数年龄是28</el-button>
      <el-button @click="getAjaxData({})">调用mutions中的getAjaxData参数年龄是{}空对象五秒钟后返回数据</el-button>
    </div>
    <vuex-child :data-obj="obj" :age="age"></vuex-child>
    <div>
      {{newObj[0]}}
      <el-button @click="detaildata">父组件改变</el-button>
    </div>
    <vuex-child :new-data = "newObj"></vuex-child>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import vuexChild from "./vuexChild";
export default {
  components: {
    vuexChild
  },
  computed: {
    ...mapState("vuexTest", ["testState", "testAge"]),
    ...mapGetters("vuexTest", ["getTestState", "getTestAge", "getMsgData"]),
    testComputed() {
      return this.$store.state.vuexTest.testComputed + "2018年8月1日11:48:02";
    }
  },
  data() {
    return {
      obj: {
        name: 'zhangsan'
      },
      age: 199,
      currentPage: this.$store.state.vuexTest.testComputed,
      newObj: ["小明"]
    }
  },
  created() {
  },
  methods: {
    ...mapMutations("vuexTest", [
      "set_test_state",
      "change_test_age",
      "get_ajax_data"
    ]),
    ...mapActions("vuexTest", ["setTestState", "changeTestAge", "getAjaxData"]),
    changeTestState() {},
    detaildata: function () {
      this.newObj[0] = "小王";
    }
  },

  mounted() {}
};
</script>


<style scoped>
.h_h3 {
  height: 50px;
  line-height: 50px;
}
.vuex_parent {
  border: 1px solid blueviolet;
  padding: 50px 0;
  margin: 50px 0;
}
.vuex_parent ul {
  margin-left: 50px;
}
</style>
