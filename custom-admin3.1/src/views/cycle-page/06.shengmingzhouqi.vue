<template>
  <div>
    <p>11111</p>

  </div>
</template>
<script>
import { onMounted, onUpdated, onUnmounted } from '@vue/composition-api'
export default {
  name: '',
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  },
}
</script>