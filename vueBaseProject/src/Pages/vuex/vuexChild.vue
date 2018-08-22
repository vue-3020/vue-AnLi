<template>
  <div>
    <h3 class="h_h3">vuexChild组件</h3>
    <div class="vuex_child">
      <ul>
        <li>这是testComputed的值：{{testComputed | reverseStr}}</li>
        <li>这是 mapState 中 testState的值：{{testState}}</li>
        <li>这是 mapState 中 testAge的值：{{testAge}}</li>
        <li>这是 mapGetters 中的 getTestState {{getTestState}}</li>
        <li>这是 mapGetters 中的 getTestAge {{getTestAge}}</li>
        <li v-if='Object.keys(getMsgData).length > 0'>
          id: {{getMsgData.id}}, name: {{getMsgData.name}}, sex: {{getMsgData.sex}}
        </li>
        <div>
          <p>{{newData[0]}}</p>
          <el-button @click="handledata">改变</el-button>
        </div>
      </ul>
      <p>{{dataObj.name}}</p>
      <p>{{newObg.name}}</p>
      <el-button @click="age = '王五'">直接改变父属性</el-button>
      <el-button @click="newObg.name = 'lisi'">改变</el-button>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from 'vuex'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: ['dataObj', 'age', "new-data"],
  computed: {
    ...mapState("vuexTest", ["testState", "testAge"]),
    // ...mapState('vuexTest', {
    //   testState: state => state.testState,
    //   testAge: state => state.testAge
    // }),
    ...mapGetters("vuexTest", ["getTestState", "getTestAge", "getMsgData"]),
    testComputed() {
      return this.$store.state.vuexTest.testComputed;
    }
  },
  data() {
    return {
      newObg: this.dataObj,
      newArr: this.newData
    };
  },
  created() {},
  methods: {
    ...mapActions("vuexTest", ["setTestState", "changeTestAge", "getAjaxData"]),
    ...mapMutations("vuexTest", [
      "set_test_state",
      "change_test_age",
      "get_ajax_data"
    ]),
    handledata: function () {
      this.newData[0] = "小李";
      // this.$set(this.newArr, 0, "小李");
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
.vuex_child {
  border: 1px solid #000;
  padding: 50px 0;
  margin-top: 20px;
}
.vuex_child ul {
  margin-left: 50px;
}
</style>
