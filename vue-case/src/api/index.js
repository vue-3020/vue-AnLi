// 项目中有一个专门用来写 请求的文件；
import  axios  from  "axios";

// axios配置默认的请求路径；
// 路径会默认拼到这个地址的后面；
axios.defaults.baseURL = "http://localhost:4000";

// axios 拦截；
// 当axios数据请求成功之后执行；它可以统一处理数据；
// 每一个请求，都会触发这个中间件中的函数；

// axios.interceptors.response.use(function (res) {
//     return  res.data; //拦截返回的结果，给前端的就是data的值
// });

//获取轮播图,返回的是一个promise对象 home
export let getSliders = () =>{
    return axios.get('/sliders')
}

//热门图书首页 home
export let getHot = () =>{
    return axios.get('/hot')
}

// 获取所有的图书；list
export let  getAll = ()=>{
  return axios.get("/books")
}

//删除一本图书 list
export  let  deleteBook=(id)=>{
  return axios.get("/delete?id="+id)
}

//收藏书籍
export let collectBook =(data)=>{
  return axios.post('/collect',data)
}
