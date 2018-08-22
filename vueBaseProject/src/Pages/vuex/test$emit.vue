<template>
  <div>
    props 获得的值：{{test}}
    <div>
      <el-button @click="emitMethods">emit</el-button>
      <!-- <button @click="emitMethods">emit2</button> -->
    </div>
  </div>
</template>

<script>
import bus from '&/common/bus'
export default {
  filters: {
  },
  props: ['test'],
  data() {
    return {
      emitData: {
        id: 1,
        name: '张飒'
      }
    };
  },
  computed: {},
  methods: {
    emitMethods() {
      bus.$emit('emitM', this.emitData)
      console.log('emit')
    },
  },
  mounted() {
  },
  watch: {
  }
};
</script>


<style scoped>
</style>
