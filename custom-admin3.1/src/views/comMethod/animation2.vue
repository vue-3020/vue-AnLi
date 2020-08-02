<template>
  <div class="box">
    <ul class="ul_style">
      <li @click="selectFood(food,$event)" v-for="food in foods" class="food-item border-1px">
        <div class="icon">
          <img width="57" height="57" :src="food.imgSrc">
        </div>
        <div class="content">
          <h2 class="name">{{food.text}}</h2>
          <span class="name">{{food.price}}¥</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cart-control  @add="addFood" :food="food"></cart-control>
        </div>
      </li>
    </ul>
    <!-- 底部消费内容 -->
    <see-right @add="addFood" :food="selectedFood" ref="shopcart" :selectFoods="selectFoods"></see-right>
  </div>
</template>
<script>
import { footerData } from '@/api/example'
import { cartControl, seeRight } from '@/components/animation2';
export default {
  name: 'animation2',
  components: { cartControl, seeRight },
  data() {
    return {
      foods: [],
      selectedFood: {},
      goods: [],

    }
  },
  mounted() {
    this.searchCities()

  },
  computed: {
    selectFoods() {
      let foods = [];
      // this.goods.forEach((good) => {
      //   good.foods.forEach((food) => {
      //     if (food.count) {
      //       foods.push(food);
      //     }
      //   });
      // });
 
      return foods;
    }
  },
  methods: {
    addFood(target) {
      this._drop(target);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    //查看详情
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },

    searchCities() {
      footerData().then(res => {
        this.foods = res.data
        console.log(this.foods)
      })
    },

    beforeDrop(el) {
      // let count = this.balls.length;
      // while (count--) {
      //   let ball = this.balls[count];
      //   if (ball.show) {
      //     let rect = ball.el.getBoundingClientRect();
      //     let x = rect.left - 32;
      //     let y = -(window.innerHeight - rect.top - 22);
      //     el.style.display = '';
      //     el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      //     el.style.transform = `translate3d(0,${y}px,0)`;
      //     let inner = el.getElementsByClassName('inner-hook')[0];
      //     inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      //     inner.style.transform = `translate3d(${x}px,0,0)`;
      //   }
      // }
    },
    dropping(el, done) {
      // let rf = el.offsetHeight;
      // this.$nextTick(() => {
      //   el.style.webkitTransform = 'translate3d(0,0,0)';
      //   el.style.transform = 'translate3d(0,0,0)';
      //   let inner = el.getElementsByClassName('inner-hook')[0];
      //   inner.style.webkitTransform = 'translate3d(0,0,0)';
      //   inner.style.transform = 'translate3d(0,0,0)';
      //   el.addEventListener('transitionend', done);
      // });
    },
    afterDrop(el) {
      // let ball = this.dropBalls.shift();
      // if (ball) {
      //   ball.show = false;
      //   el.style.display = 'none';
      // }
    },
    //增加 数量
    addCart(event) {
      debugger
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target);
    },
    //删除 数量
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>
 
<style lang="less" scoped>
.box {
  border: 1px solid #ccc;
  position: relative;
}
.ul_style {
  list-style: none;
  width: 500px;
  margin: 60px auto 60px;
  padding: 20px;
  height: 600px;

  overflow: auto;
  li {
    position: relative;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 6px;
    .name {
      margin-left: 10px;
    }
    span {
      color: #f60;
      font-size: 20px;
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
}
</style>