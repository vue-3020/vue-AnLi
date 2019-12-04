<template>
  <div>
    <p>{{count}} </p>
    <button @click="add">点击加一</button>
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs } from '@vue/composition-api'
export default {
  name: '',
  data() {
    return {

    }
  },
  setup() {
    // 创建响应式数据对象 count，初始值为 0
    // const count = ref(0)
    // console.log('只有value一个属性', count, count.value) //count.value在setup里面才生效在外面直接用count


    //新的覆盖旧的ref

    //isRef
    // const foo = ref(22)
    // const unwrapped = isRef(foo) ? foo.value : foo
    // console.log(unwrapped)


    const reactiveData = reactive({ count: 0, name: '黄小明' })
    const add = () => {
      reactiveData.count++
    }
    return {
      ...toRefs(reactiveData), //转成ref响应式的写法
      add
    }
  },
}
</script>