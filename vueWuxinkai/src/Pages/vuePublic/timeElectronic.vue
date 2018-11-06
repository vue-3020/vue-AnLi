<template>
  <div>
    <div class="timeGrid">
      <img :src="getTime.year_1" alt="">
      <img :src="getTime.year_2" alt="">
      <img :src="getTime.year_3" alt="">
      <img :src="getTime.year_4" alt="">
      <img src="/static/images/点.png" alt="">
      <img :src="getTime.month_1" alt="">
      <img :src="getTime.month_2" alt="">
      <img src="/static/images/点.png" alt="">
      <img :src="getTime.days_1" alt="">
      <img :src="getTime.days_2" alt="">

      <img class="ml5" :src="getTime.hour_1" alt="">
      <img :src="getTime.hour_2" alt="">
      <img src="/static/images/数冒.png" alt="">
      <img :src="getTime.min_1" alt="">
      <img :src="getTime.min_2" alt="">
      <img src="/static/images/数冒.png" alt="">
      <img :src="getTime.sec_1" alt="">
      <img :src="getTime.sec_2" alt="">
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    setInterval(() => {
      let d = new Date()
      let tmp = {}
      let year = d.getFullYear().toString()//获取的是年
      tmp['year_1'] = `/static/images/数字${year.substring(0, 1)}.png`
      tmp['year_2'] = `/static/images/数字${year.substring(1, 2)}.png`
      tmp['year_3'] = `/static/images/数字${year.substring(2, 3)}.png`
      tmp['year_4'] = `/static/images/数字${year.substring(3, 4)}.png`
      let month = (d.getMonth() + 1).toString() //获取月
      tmp['month_1'] = `/static/images/数字${month.substring(0, 1)}.png`
      tmp['month_2'] = `/static/images/数字${month.substring(1, 2)}.png`
      let days = d.getDate().toString() //获取日
      tmp['days_1'] = `/static/images/数字${days.substring(0, 1)}.png`
      tmp['days_2'] = `/static/images/数字${days.substring(1, 2)}.png`
      //字符串从 后向前截取，两位 给方法补零写法
      let hour = ('000' + d.getHours()).substr(-2) //小时
      tmp['hour_1'] = `/static/images/数字${hour.substring(0, 1)}.png`
      tmp['hour_2'] = `/static/images/数字${hour.substring(1, 2)}.png`
      let min = ('000' + d.getMinutes()).substr(-2)
      tmp['min_1'] = `/static/images/数字${min.substring(0, 1)}.png`
      tmp['min_2'] = `/static/images/数字${min.substring(1, 2)}.png`
      let sec = ('000' + d.getSeconds()).substr(-2)
      tmp['sec_1'] = `/static/images/数字${sec.substring(0, 1)}.png`
      tmp['sec_2'] = `/static/images/数字${sec.substring(1, 2)}.png`

      // vuex设置this.$store.dispatch更新没有同步到组件created(){}方法里面
      this.$store.dispatch('screen/setTimes', tmp).then(datas => {
        // console.log(datas)
      }).catch(err => {
        console.log(err)
      })
    }, 500)
  },
  computed: {
   getTime() { //接受vuex 发给来的值
   //vuex 的获取 this.$store.getters
      return this.$store.getters["screen/getTimeObj"]
    },
  }
}
 //vuex 的获取 this.$store.getters
 //传给vuex 值 this.$store.dispatch
</script>

