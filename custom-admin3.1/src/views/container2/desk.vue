
<template>
  <div class="main-wrapper">
    <h2>书桌定制</h2>
    <div class="img-main-wrapper">
      <transition name="fade" mode="out-in">
        <img v-if="currentChairIndex !== undefined" :key=chairs[currentChairIndex].main :src="chairs[currentChairIndex].main" class="img-absolute">

      </transition>
      <transition name="fade" mode="out-in">
        <img v-if="currentMatIndex !== undefined" :key=mats[currentMatIndex].main :src="mats[currentMatIndex].main" class="img-absolute">
      </transition>
      <img class="img-main" src="../../assets/images/img/jarvis.png" alt="">
    </div>
    <div v-if="progressBarOn" class="progress-bar-wrapper">
      <div class="progress-bar" :style="{width: progressBar}"></div>
    </div>
    <div class="content-row">
      <h3>选择你的椅子</h3>
      <div class="img-thumbnail-wrapper">
        <img v-for="(chair, index) in chairs" class="img-thumbnail" :src="chair.thumbnail" @click="_handleImagePreview({key: 'currentChairIndex',value: index})" :class="currentChairIndex == index ? 'activeClass' : ''">
        </img>
      </div>
    </div>
    <div class="content-row">
      <h3>选择你的垫子</h3>
      <div class="img-thumbnail-wrapper">
        <img v-for="(mat, index) in mats" class="img-thumbnail" :src="mat.thumbnail" @click="_handleImagePreview({key: 'currentMatIndex',value: index})" :class="currentMatIndex == index ? 'activeClass' : ''">
        </img>
      </div>
    </div>
  </div>
</template>
<script>
const totalDuration = 2000;

export default {
  name: 'demo11',
  props: [],
  data() {
    return {
      progressBarOn: true,
      progressBar: 0,
      intervalProgress: undefined,
      intervalItem: undefined,
      currentChairIndex: undefined,
      currentMatIndex: undefined,
      mats: [
        {
          thumbnail: require('../../assets/images/img/1.png'),
          main: require('../../assets/images/img/1-1.png'),
        },
        {

          thumbnail: require('../../assets/images/img/2.png'),
          main: require('../../assets/images/img/2-2.png'),
        },
        {

          thumbnail: require('../../assets/images/img/3.png'),
          main: require('../../assets/images/img/3-3.png'),
        }
      ],
      chairs: [
        {
          thumbnail: require('../../assets/images/img/4.png'),
          main: require('../../assets/images/img/4-4.png'),
        },
        {

          thumbnail: require('../../assets/images/img/5.png'),
          main: require('../../assets/images/img/5-5.png'),
        },
        {

          thumbnail: require('../../assets/images/img/6.png'),
          main: require('../../assets/images/img/6-6.png'),
        }
      ]
    }
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.arr[this.number]
      }
    }
  },
  methods: {
    /**
     * @params event is an object
     * key = type of item clicked
     * value = index passed in
     */
    _handleImagePreview(event) {
      // Disable timer functionality
      clearInterval(this.intervalItem); //清楚定时器
      clearInterval(this.intervalProgress); //加载条的百分百
      this.progressBarOn = false;

      // Show item clicked
      let index = event.value;
      let dataType = event.key;
      if (this[dataType] == index) { //当前是点击的这个，已经是显示再点击就是隐藏了
        this[dataType] = undefined;
      } else {
        this[dataType] = index;
      }
    },
  },
  mounted() {
    let progressCount = 0;
    let count = 0;
    let maxArrayLength = this.chairs.length;
    this.intervalProgress = setInterval(() => {
      this.progressBar = progressCount + '%'
      progressCount += 0.1111111; /* 100%/(9000/10) */
      if (progressCount > 100) {
        progressCount = 0;
      }
    }, 10);

    this.intervalItem = setInterval(() => {
      console.log("I ran");
      this.currentChairIndex = count;
      this.currentMatIndex = count;
      if (count < maxArrayLength - 1) {
        count++;
      } else {
        count = 0;
      }
    }, 3000)

  }
}
</script>
<style lang="less" scoped>
/** HTML ELEMENTS **/
body {
  // background-image: url("../img/white_wall_hash.png");
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0px;
}

h2 {
  text-align: center;
  margin-top: 0px;
}

img {
  width: 100%;
}

/** MAIN STYLES **/
#app {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.main-wrapper {
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px;
  padding-bottom: 50px;
  width: 400px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.075);
  background-color: white;
}

.img-main-wrapper {
  position: relative;
  height: 300px;
}

.img-absolute {
  position: absolute;
}

.content-row {
  text-align: center;
}

@media only screen and (max-width: 600px) {
  h2 {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .main-wrapper {
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
  }

  body {
    padding: 0px;
  }
}
/** CHOOSE ITEMS STYLES **/
.img-thumbnail-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.img-thumbnail {
  box-sizing: border-box;
  width: 33%;
  max-width: 100px;
  margin-left: 10px;
  margin-right: 10px;
}

/** CONDITIONAL CLASSES **/
.activeClass {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

/** TRANSITIONS **/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/** PROGRESS BAR **/
.progress-bar {
  height: 5px;
  background-color: red;
}
</style>
 