<template>
    <div>
      <div style="background: #ccc;margin-bottom: 20px">
        <ul>
          <li><router-link :to="{path:'/routeParams/routeSon1', query: {name: '杨洋', age: 26, sex: '男'}}">命名路由query传参/,属于url传递参数。刷新不会消失</router-link></li>
        </ul>
        <button @click="sendQuery">编程式路由query传递参数</button>
      </div>
      <div  style="background: #ccc;margin-bottom: 20px">
        <ul>
          <li><router-link :to="{name:'routeSon2',params:{dataObj:'这是通过点击文字传递的参数'}}">命名路由params传参routeSon2</router-link></li>
        </ul>
        <button @click='sendParams'>编程式路由params传递参数</button>
      </div>
      <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          data: 1234566,
          obj: {
            name: '杨妮',
            age: 22,
            sex: '女'
          },
          obj2: {
            name: '鹿晗',
            age: 18,
            sex: '男'
          }
        }
      },
      methods:{
        sendQuery(){
          this.$router.push({
            path:'/routeParams/routeSon1',
            query:this.obj
          })
        },
        sendParams(){
          this.$router.push({
            name:'routeSon2',
            params:{
              dataObj:this.obj2
            }
          })
        }
      }
    }
</script>

<style scoped>
  button {
    margin-top: 20px;
    background-color: blue;
    color: #fff;
    padding: 5px 10px;
  }
  ul{list-style: none}
</style>
