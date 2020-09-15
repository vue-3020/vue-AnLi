<template>
  <div>
    <h1>vuex的存储</h1>
    <div style="width:600px;margin:0 auto">
      <Form :model="formLeft" label-position="left" :label-width="100">
        <FormItem label="Title">
          <Input v-model="formLeft.input1"></Input>
        </FormItem>
        <FormItem label="Title name">
          <Input v-model="formLeft.input2"></Input>
        </FormItem>
        <FormItem label="Aligned title">
          <Input v-model="formLeft.input3"></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>

export default {
  name: '',
  data() {
    return {
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
    }
  },
  created() {
    this.formLeft = this.$store.state.catchJS.tablist.param
  },
  //页面离开的时候做缓存
  beforeRouteLeave(to, from, next) {
    this.$store.state.catchJS.tablist.param = this.formLeft
    next()
  },
}
</script>
