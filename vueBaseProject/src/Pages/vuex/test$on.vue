<template>
  <div>
    <div>获得到的emitData:{{getEmitData.id}}</div>
    <test-emit :test='testStr' @emitM="add"></test-emit>
  </div>
</template>

<script>
import testEmit from './test$emit'
import bus from '&/common/bus'
export default {
  components: {
    testEmit
  },
  filters: {
  },
  props: [],
  data() {
    return {
      testStr: "ABCDEFG",
      getEmitData: {},
    };
  },
  computed: {},
  created() {
    bus.$on('emitM', (params) => {
      console.log('$on')
    })
    // this.$on('emitM', (obj) => {
    //   console.log('$on')
    //   this.getEmitData = obj
    // })
  },
  methods: {
    add() {
      console.log('kgjeiji')
    }
  },
  mounted() {
    // this.$on('emitM', (obj) => {
    //   console.log('$on')
    //   this.getEmitData = obj
    // })
  },
};
</script>


<style scoped>
</style>
