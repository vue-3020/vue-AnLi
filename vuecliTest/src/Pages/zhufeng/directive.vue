<template>
    <div class="right">
        <h2 style="color:green">(1)指令</h2>
        <input type="text" v-model="msg">
        <div v-text="msg"> </div>
        <br>
        <div><b style="color:red">v-once</b> :只绑定一次，当数据再次发生变化，也不会导致页面刷新</div>
        <div v-once > 
            {{msg}} === {{msg}}
        </div>
        <br>
        <div><b style="color:red">v-html</b> : 把标签转译</div>
        <br>
        <div><b style="color:red">v-text</b> : 防止{}出现颤抖</div>
        <br>
        <div><b style="color:red">v-clock</b> : 页面刷新会出现{}闪烁，加v-clock就不会闪烁，第二步需要加个[v-cloak] { display: none }</div>
        <br>
        <h2 style="color:green">（2）响应式的数据变化 reactivity</h2>
        <p>使用变量先要 <span style="color:blue">初始化</span> ，否则新加入的属性不会导致页面刷新，</p>
        <p>//此方法可以给对象 添加响应式数据变化 </p>
        <p>// bus.$set(bus.a,'123')</p>
        <br>
        <div>取数组方法, 改变数组的某一项是监听不到的</div>
        <div>改变数组的内置方法：pop push shift unshift sort reserve splice</div>
        <p>{{arr}}</p>
        <ul>
            <li v-for="(fruit,index) in fruits">
                {{index+1}} {{fruit.name}}
                <ul style="margin-left:20px">
                    <li v-for="(c,childIndex) in fruit.color">
                        {{childIndex+1}} {{c}}
                    </li>
                </ul>
            </li>
        </ul>
        <h2 style="color:green">(3)事件</h2>
        <button @click="btnClick($event,1)">@click点击事件</button>
        <br>
         <h2 style="color:green">（4）键盘事件</h2>
         <input type="text" v-model="val" @keyup="add">
         <ul>
             <li v-for="(a,index) in arr3">
                 {{a}} 
                 <button @click="remove(index)">删除</button>
             </li>
         </ul>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      arr3:[],
      val:'',
      msg:'这是默认数据用老v-once',
      arr:[1,2,3,4,5],
      a:'1',
      fruits:[
          {name:'香蕉',color:['green','red','pink']},
          {name:'苹果',color:['green','red']},
          {name:'鸭梨',color:['green','blue','pink']},
      ],
      products:[] //created 初始化
    }
  },
  filters:{ //过滤器
      toFixed(input,paraml){ //
          return '$'+input.toFixed(paraml)
      }
  },
  computed:{ //计算属性，也是放在vm实例上，不能和methods和data属性相同
      checkAll:{
          get(){
              return false
          },
          set(){

          }
      }
  },
  //专门发送ajax用
  created(){ //数据被初始化后被调用，调用数据的地方 (也叫钩子函数)
  axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
      .then(response => {
         console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    console.log(this.products)
  },
  //把事件都写到methods上
  methods:{ //麦瑟的 ， methods 和data数据都放到 vue的实例上 而且名字不能冲突，冲突会报错，methods的this指向的都是实例
      btnClick(event,b){
          console.log(this.a,event,b)
      },
      add(e){
          if(e.keyCode === 13){
              this.arr3.unshift(this.val)
          }
      },
      remove(i){ //如果相等就删除，
          this.arr3 = this.arr3.filter((item,index)=>index!==i)}
      },
}
</script>

<style scoped>
</style>
