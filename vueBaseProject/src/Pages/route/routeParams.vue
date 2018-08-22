
<template>
  <div>
     <p>路由的名字：{{$route.name}}</p>
     <ul style="">
        <li><router-link to="/routeParams/home1">命名路由query传参/</router-link></li>
        <li><router-link :to="{path:'/routeParams/home1', query: {dataObj: data, name:'nihao'}}">命名路由query传参/</router-link></li>
        <li><router-link :to="{name:'foo',params:{dataObj:'xeixiei'}}">命名路由params传参foo</router-link></li>
    </ul>

    <button @click="sendQuery">编程式路由query传递参数</button>

    <button @click='sendParams'>编程式路由params传递参数</button>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 1234566,
      obj: {
        name: 'haha',
        age: 12,
        sex: '女'
      }
    }
  },
  methods: {
    sendQuery() {
      this.$router.push({
        path: '/routeParams/home1',
        query: this.obj
      })
    },
    sendParams() {
      this.$router.push({
        name: 'foo',
        params: {
          dataObj: "this is params"
        }
      })
    }
  }
};
</script>


<style scoped>
  button {
    margin-top: 20px;
    background-color: blue;
    color: #fff;
    padding: 5px 10px;
  }
</style>
