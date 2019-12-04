<template>
  <div>
    <h1>setup</h1>
    <h2>setup 函数会在 beforeCreate 之后、created 之前执行</h2>
    <h2>定义data数据，定义moutend 定义watch， conputend 都放到setup中</h2>
    <h2>注意：在 setup() 函数中无法访问到 this ， this上的属性可以用 context参数 用</h2>
    <com-setup p1='1234567890'></com-setup>

    <br>
    <br>
    <br>
    <h1>reactive</h1>
    <h2>reactive() 函数接收一个普通对象，返回一个响应式的数据对象。 在vue中我们要创建一个对象的私有数据，要用data节点，在vue3中用reactive</h2>
    <h2>限制比较多我们第一想到的应该是ref</h2>
    <com-reactive></com-reactive>
    <br>
    <br>
    <br>
    <h1>ref</h1>
    <h2>在 template 中访问 ref 创建的响应式数据</h2>
    <h2>ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 value 属性：</h2>
    <h2>注意：新的 ref 会覆盖旧的 ref，</h2>
    <h2>isRef() 用来判断某个值是否为 ref() 创建出来的对象；应用场景：当需要展开某个可能为 ref() 创建出来的值的时候，例如：，</h2>
    <h2>toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 ref() 类型的响应式数据，最常见的应用场景如下：</h2>
    <com-refs></com-refs>

    <h1>computed</h1>
    <h2>computed() 用来创建计算属性，computed() 函数的返回值是一个 ref 的实例。使用 computed 之前需要按需</h2>
    <h2>创建只读的计算属性:在调用 computed() 函数期间，传入一个 function 函数，可以得到一个只读的计算属性</h2>
    <br>
    <br>
    <com-computed></com-computed>
    <br>
    <br>
    <br>
    <h1>watch</h1>
    <h2>watch() 函数用来监视某些数据项的变化，从而触发某些特定的操作，使用之前需要按需导入：</h2>
    <h2>在 setup() 函数内创建的 watch 监视，会在当前组件被销毁的时候自动停止</h2>
    <h2>监视多个数据源 监视 reactive 类型的数据源 和 监视 ref 类型的数据源： </h2>
    <com-watch></com-watch>

    <hr>
    <hr>
    <hr>
    <hr>
    <h1>生命周期</h1>
    <com-zhou></com-zhou>
    <br>
    <br>
    <br>
    <br>
    <h1>provide 给孙子组件传内容，或者更深组件</h1>
    <h1>inject 孙子接收爷爷组件的内容</h1>
  </div>
</template>

<script>
// import {} from '@vue/composition-api'//在局部页面引入内容
import SetUpCom from './01.setup'
import ReactiveCom from './02.reactive'
import RefCom from './03.ref'
import ComputedCom from './04.computed'
import WatchCom from './05.watch'
import ZhouCom from './06.shengmingzhouqi'
export default {
  components: {
    "com-setup": SetUpCom,
    "com-reactive": ReactiveCom,
    "com-refs": RefCom,
    "com-computed": ComputedCom,
    "com-watch": WatchCom,
    "com-zhou": ZhouCom,
  },
  name: '',
  data() {
    return {

    }
  },
  setup() {
    console.log('setup 1')
  },
  beforeCreate() {
    console.log('beforeCreate 2')
  },
  created() {
    console.log(' created 3')
  }
}
</script>
