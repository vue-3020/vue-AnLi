<template>
    <div class="FU">
      <p>父组件：组建之间方法互相调用</p>
      <refs-child ref="myChild"></refs-child>
      <div class="zhuyi">注意这里：由于使用了el-button其实他也是子组件，所以在使用this.$children会获得三个组件</div>
      <br>
      <el-button @click="getChildData">（调用data）获取子组件中的中data里的msg</el-button><span>: {{childMsg}}</span>
      <br>
      <div style="margin:20px 0 0 0;">
        <el-button @click="getChildMethods">(调用方法)调用子组件中的方法，修改子组件name</el-button>
      </div>
      <br>
      <div>
        这是父元素的方法，被子元素调用:{{parentMsg2}}
      </div>
    </div>
</template>

<script>
    import refsChild from './refsChild'
    export default {
      components: {
        refsChild
      },
      data(){
        return{
          childMsg: '',
          parentMsg: '这是父元素数据被子元素调用',
          parentMsg2: '（现在没有被调用）'
        }
      },
      methods:{
        //for...of 语句创建一个循环来迭代可迭代的对象。
        getChildData(){
          for (let child of this.$children) {
            // child 就相当于子组件
            // child.$options.name 获取的是当前子组件的  name: "refsChild_in"
            // 上面会有按钮组件
            if(child.$options.name =='refsChild_in'){ //el-button 也是一个组件所有需要判断
              this.$set(this, 'childMsg', child.msg) //给this添加自定义属性，
            }
          }
          // console.log(this)
        },
        getChildMethods() {
          this.$refs.myChild.changeName('父元素调用子元素组件的方法，修改子组件的里data的值')
        },
        //子元素调用父元素方法
        setParentMsg() {
          this.$set(this, 'parentMsg2', '（我被调用了）')
        },
      }
    }
</script>


<style scoped>
  .FU{background: #20a0ff;width: 100%;height: 100%;position: relative;overflow: hidden;color: #fff}
  .zhuyi{color: red}
</style>
