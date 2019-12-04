<template>
  <Card>
    <Form ref="exampleForm" :label-width="120">
      <FormItem label="内容：">
        <Editor ref="wangeditor" :catchData="catchData" v-model="htmlmodel"></Editor>
      </FormItem>
    </Form>
  </Card>
</template>
<script>

import Editor from '@/components/editor'
export default {

  data () {
    return {
      htmlmodel: ''
    }
  },
  components: {
    Editor
  },
  methods: {
    catchData (value) {
      console.log(value)
      this.htmlmodel = value // 在这里接受子组件传过来的参数，赋值给data里的参数
    }
  }
}
</script>
