<template>
  <div>
    <h3 class="h_h3">组建之间方法互相调用 refsParents.vue</h3>
    <refs-child ref="myChild"></refs-child>
    <div class="zhuyi">注意这里：由于使用了el-button其实他也是子组件，所以在使用this.$children会获得三个组件</div>
    <el-button @click="getChildData">获取子组件中的中data里的msg</el-button><span>: {{childMsg}}</span>
    <div>
      <el-button @click="getChildMethods">调用子组件中的方法修改子组件name</el-button>
    </div>
  </div>
</template>

<script>
import refsChild from "./refsChild";
export default {
  components: {
    refsChild
  },
  data() {
    return {
      childMsg: '',
      parentMsg: 'parent'
    }
  },
  created() {

  },
  methods: {
    getChildData() {
      for(let child of this.$children) {
        console.log(child)
        if(child.$options.name === 'refschild') {
          this.$set(this, 'childMsg', child.msg)
        }
      }
    },
    setParentMsg() {
      this.$set(this, 'parentMsg', 'yes this is parentMsg')
    },
    getChildMethods() {
      this.$refs.myChild.changeName('刘某某')
    }
  },
  mounted() {
    console.log(this.$children)
  }
};
</script>


<style scoped>
.h_h3 {
  height: 50px;
  line-height: 50px;
}
.reload_btn {
  float: right;
}
.zhuyi {
  font-size: 20px;
  color: red;
  padding: 20x 0;
}
</style>
