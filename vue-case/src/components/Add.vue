<template>
    <div>
         <Myheader>添加页</Myheader>
         <div class="content container">
           <ul>
             <li>
               <label>书的名字</label>
               <input type="text" v-model="book.bookName">
             </li>
             <li>
               <label>书的信息</label>
               <input type="text" v-model="book.bookInfo">
             </li>
             <li>
               <label>书的价格</label>
               <input type="text" v-model="book.bookPrice">
             </li>
             <li>
               <label>书的封面</label>
               <input type="text" v-model="book.bookCover">
             </li>
           </ul>
            <!--点击确定修改，一定是最新的数据-->
          <button @click="add(book)">添加2</button>
         </div>
    </div>
</template>
<script>
import Myheader from '../base/MHeader';
import {addBook} from '../api/index.js'
export default {
    data(){
        return{
          book:{}
        }
    },
    created(){

    },
    methods:{
      //添加 书籍
      async add(book){
        console.log(book)
        await addBook(book)
        //添加成功跳转的 列表页面list
        this.$router.push('/list')
      }
    },
    computed:{

    },
    components:{
        Myheader
    }
}
</script>

<style scoped>
  .container{
    width:100%;
    padding:20px;
    position: fixed;
    top:40px;
    left:0;
    bottom:50px;
    right:0;
    height:100%;
    z-index: 10;
  }
  .container li{
    height:100px;
  }
  .container li  label{
    display:block;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .container li input{
    display: block;
    width:300px;
    height:40px;
    padding-left:10px;
    margin-left:5px;
  }
  .container  button{
    width:100px;
    height:40px;
    display: block;
    text-align: center;
    line-height: 40px;
    background: red;
    color:white;
    font-size:20px;
    border-radius: 5px;
    border:none;
  }
</style>

