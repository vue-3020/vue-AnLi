<template>
  <div>
    11223432
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  setup(props, context) {
    console.log('子组件的setup', props, props.p1)
    console.log(
      //这些内容都是在vue2中用this访问的
      
      context.attrs,
      context.slots,
      context.parent,
      context.root,
      context.emit,
      context.refs
    )
  },
  props: {
    p1: String
  }
}
</script>