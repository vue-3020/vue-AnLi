<template>
  <div>
    <p>{{count}}</p>
    <p>{{plusOne}}</p>
    <button @click="plusOne++">计算属性点击</button>
  </div>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
export default {
  name: '',
  setup() {
    const count = ref(0)

    // 根据 count 的值，创建一个响应式的计算属性 plusOne
    // 它会根据依赖的 ref 自动计算并返回一个新的 ref

    const plusOne = computed({
      get: () => count.value ,
      set: val => {
        count.value = val  
      }
    })
    return {
      count,
      plusOne
    }
  },
}
</script>