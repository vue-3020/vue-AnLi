<template>
  <div>
    <!-- <p>{{count2}}</p> -->
  </div>
</template>
<script>
import { ref, watch, reactive } from '@vue/composition-api'
export default {
  name: '',
  setup() {
    // const count2 = ref(0);
    // // 定义 watch，只要 count 值变化，就会触发 watch 回调
    // // watch 会在创建时会自动调用一次
    // watch(() => console.log('watch',count2.value))


    // 定义数据源
    const state2 = reactive({ count: 0 })
    // 监视 state.count 这个数据节点的变化
    watch(() => state2.count, (newVal, lodVal) => {
      console.log(newVal, lodVal)
    }, {
      lazy: true,//组件刚刚创建不要执行这个watch
    })

    // 输出 0
    setTimeout(() => {
      state2.count++
      // 输出 1
    }, 1000)

    //监听多个值得变化 监视 reactive 类型的数据源：
    // const state = reactive({ count: 0, name: 'zs' })
    // watch(
    //   [() => state.count, () => state.name], // Object.values(toRefs(state)),
    //   ([count, name], [prevCount, prevName]) => {
    //     console.log(count) // 新的 count 值
    //     console.log(name) // 新的 name 值
    //     console.log('------------')
    //     console.log(prevCount) // 旧的 count 值
    //     console.log(prevName) // 新的 name 值
    //   },
    //   {
    //     lazy: true // 在 watch 被创建的时候，不执行回调函数中的代码
    //   }
    // )
    // setTimeout(() => {
    //   state.count++
    //   state.name = 'ls'
    // }, 1000)


    // ref监听多个值得变化
    // const count = ref(0)
    // const name = ref('zs')

    // watch(
    //   [count, name], // 需要被监视的多个 ref 数据源
    //   ([count, name], [prevCount, prevName]) => {
    //     console.log(count)
    //     console.log(name)
    //     console.log('-------------')
    //     console.log(prevCount)
    //     console.log(prevName)
    //   },
    //   {
    //     lazy: true
    //   }
    // )

    // setTimeout(() => {
    //   count.value++
    //   name.value = 'xiaomaolv'
    // }, 1000)


    //向定时器一样被清楚
    const stop = watch(() => { })
    // 调用停止函数，清除对应的监视
    stop()
  },
}
</script>