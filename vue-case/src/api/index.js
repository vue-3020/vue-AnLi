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

//点击收藏书籍 list
export let collectBook =(data)=>{
  return axios.post('/collect',data)
}
//收藏页面 collect
export let getCollect = () =>{
  return axios.get('/books?page=collect')
}

//点击图书跳转详情页,获取某一本图书的详情 Detail
export let getOne = (id) =>{
    return axios.get("getOne?id="+id)
}

//修改 详情页内容 Detail
export let update =(data)=>{
   // axios : get 传参直接拼到url的后面
  // post  : 作为post的第二个参数；
    return axios.post("/update",data)
}

//增加数据
export let addBook =(data)=>{
  return axios.post("/add",data)
}
