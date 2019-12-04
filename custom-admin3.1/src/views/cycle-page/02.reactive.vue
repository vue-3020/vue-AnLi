<template>
  <div>
    <p>当前的 count 值为：{{count}}</p>
    <p>当前的 count 值为：{{number}}</p>
    <button @click="count++">count点击</button>
    <button @click="number++">number点击</button>
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api'
export default {
  name: '',
  data() {
    return {

    }
  },
  setup() {

    const state = reactive({ count: 0, number: 1 })
    // console.log(state) //Observer 里的内容都是响应式的
    // setup 函数中将响应式数据对象 return 出去，供 template 使用
    return state  //只有return才可以用
  },
}
</script>