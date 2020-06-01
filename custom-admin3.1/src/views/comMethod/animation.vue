<template>
  <div>
    <Row>
      <Col span="8">
      <Button @click="handlebox" type="primary">if点击动画</Button>
      <transition name="myfade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled">
        <div v-if="btn.flag" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
      </Col>
      <Col span="8">
      <Button @click="isShow=!isShow" type="primary">show点击动画</Button>
      <transition name="fade"> 
        <!-- 

          " transiton="fade" 添加过度动画
         -->
        <div id="div1" v-show="isShow" transiton="fade"></div>
      </transition>
      </Col>
      <Col span="8">col-8</Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'bigMinGrid',
  props: [],
  data() {
    return {
      isShow: false,
      btn: {
        flag: false
      }
    }
  },
  methods: {
    handlebox() {
      this.btn.flag = !this.btn.flag
    },
    // 过渡进入
    // 设置过渡进入之前的组件状态
    beforeEnter: function (el) {
      // ...
    },
    // 设置过渡进入完成时的组件状态
    enter: function (el, done) {
      // ...
      done()
    },
    // 设置过渡进入完成之后的组件状态
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },
    // 过渡离开
    // 设置过渡离开之前的组件状态
    beforeLeave: function (el) {
      // ...
    },
    // 设置过渡离开完成时地组件状态
    leave: function (el, done) {
      // ...
      done()
    },
    // 设置过渡离开完成之后的组件状态
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
    }
  }
}
</script>
 
<style lang="less" scoped>
.ball {
  position: fixed;
  width: 100px;
  height: 100px;
  border-radius: 50;
  background: chartreuse;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); //动画只对隐藏的时候起效果
}

//只有v-if能用
.myfade-enter-active,
.myfade-leave-active {
  transition: opacity 0.5s;
}
.myfade-enter, .myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*
    name         用于自动生成CSS过渡类名        例如:name:'fade'将自动拓展为.fade-enter，.fade-enter-active等
    appear      是否在初始渲染时使用过渡         默认为false
    css            是否使用 CSS 过渡类。             默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
    mode        控制离开/进入的过渡时间序列    可设为"out-in"或"in-out"；默认同时生效
    type          指定过渡事件类型                      可设为transition或animation，用于侦听过渡何时结束;可以不设置，Vue内部会自动检测出持续时间长的为过渡事件类型
    duration    定制进入和移出的持续时间        以后用到再看


指定过渡的样式
 appear-class             初次渲染时的起始状态    ;如果不存在则等于enter-class属性                 这三个属性得设置了appear为true才生效
    appear-to-class         初次渲染时的结束状态    如果不存在则等于enter-to-class    属性
    appear-active-class   初次渲染时的过渡           如果不存在则等于enter-active-class属性
    enter-class                进入过渡时的起始状态  
    enter-to-class            进入过渡时的结束状态 
    enter-active-class     进入过渡时的过渡          
    leave-class               离开过渡时的起始状态    
    leave-to-class          离开过渡时的结束状态    
    leave-active-class    离开过渡时的过渡  
    

内部会根据name拼凑出对应的class来 例如一个transition的name="myfade"
myfade-enter
myfade-enter-to
myfade-enter-active
myfade-leave
myfade-leave-to
myfade-leave-active
*/

// v-show动画
#div1 {
  position: fixed;
  width: 100px;
  height: 100px;
  border-radius: 50;
  background: darkorange;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>