<template>
  <div class="shopcart">
    <div class="content">
      <!-- 左侧图标 -->
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight':totalCount>0}">
          <Icon type="ios-analytics" class="shopping_cart" :class="{'highlight':totalCount>0}" />
        </div>
        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    };
  },
  watch: {
    selectFoods(newData, lodData) {
      console.log(newData, lodData)
    }
  },
  computed: {
    //总价值
    totalPrice() {
      let total = 0;
      //计算相加得到总数
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    //数量
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
  },
  methods: {
    drop(el) {
      //传过来的是当前的标签
      console.log(el)
      // for (let i = 0; i < this.balls.length; i++) {
      //   let ball = this.balls[i];
      //   if (!ball.show) {
      //     ball.show = true;
      //     ball.el = el;
      //     this.dropBalls.push(ball);
      //     return;
      //   }
      // }
    },
  }
};
</script>

<style lang="less" scoped>
.shopcart {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 60px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    height: 100%;
    .logo-wrapper {
      display: inline-block;
      vertical-align: top;
      position: relative;
      top: -10px;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      box-sizing: border-box;
      border-radius: 50%;
      background: #141d27;
      .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
        .shopping_cart {
          line-height: 44px;
          font-size: 24px;
          color: #80858a;
          &.highlight {
            color: #fff;
          }
        }
      }
      .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      }
    }
  }
}
.price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 700;
  &.highlight {
    color: #fff;
  }
}
</style>