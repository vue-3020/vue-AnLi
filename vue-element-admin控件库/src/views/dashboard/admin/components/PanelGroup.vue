<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">New Visits</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Messages</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Purchases</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// （1 ）定义变量
$red:red;
$border:2;
//被继承
.fff{background: #fff;}

//mixin 
@mixin bandf($b,$f){
  font-size: #{$f}px;
  color: $b;
};

// 引入其他 sass
// @import “t2.sass”

//判断语句 宽度5就是蓝色背景，
@mixin bandf2($f){
  @if($f==5){
  background: blue;
  }@else{
  background: pink ;
  }
};

// 循环 来源于哪里去哪里
// @for $i from 1 to 5{
//   .a#{$i}{
//     background: url('img/#{$i}.png')
//   }
// }

// @while $d > 5{
//   .a#{$d}{
//     background: url('img/#{$d}.png')
//   }
//   $i: $i + 1 
// }

// @each $i in 1,2,3,4,5{
//   .a#{$i}{
//     background: url('img/#{$i}.png')
//   }
//   $i: $i + 1 
// }

//函数 设置颜色
@function fontColor($r,$g,$b,$a){
  @return rgba($r,$g,$b,$a)
}

.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    //（2）  如果是组合的方式需要加 #{}
    border: #{$border}px solid $red;
    //（3） 计算功能,
    height: 50px + 58px;
    // 注意变量之间不能相加计算 ，想乘可以
    // height: #{$border} + #{$border}; height: 2 + 2
    cursor: pointer;
    //（5）重复利用的代码
    @include bandf(#fff,12);
    position: relative;
    overflow: hidden;
    //（4）继承
    @extend .fff;
    // 不能继承嵌套选择器
    // @extend .a .b;
    box-shadow: 4px  4px 40px rgba(0, 0, 0, .05);
    // border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: $red;
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
        //if判断
         @include bandf2(12);
         //函数
         color: fontColor(12,74,214,1);
      }
    }
  }
}
</style>
